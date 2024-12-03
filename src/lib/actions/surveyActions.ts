"use server";

import { Response } from "@/models/Response";
import { Survey } from "@/models/Survey";
import { revalidatePath } from "next/cache";
import { dbConnect } from "../mongodb";

export async function getSurveyResults(surveyId: string) {
  await dbConnect();

  const survey = await Survey.findById(surveyId);
  if (!survey) {
    throw new Error("Survey not found");
  }

  const responses = await Response.find({ surveyId });

  const optionScores = survey.options.map((_, index) => ({
    id: index + 1,
    text: survey.options[index],
    score: 0,
  }));

  responses.forEach((response) => {
    response.selections.forEach((optionId, index) => {
      const score = 10 - index;
      optionScores[optionId - 1].score += score;
    });
  });

  return optionScores.sort((a, b) => b.score - a.score).slice(0, 10);
}

export async function saveSurveyResponse(
  surveyId: string,
  fullName: string,
  selections: number[]
) {
  await dbConnect();

  const response = new Response({
    surveyId,
    fullName,
    selections,
  });

  await response.save();
}

export async function getSurveyById(surveyId: string) {
  await dbConnect();

  const survey = await Survey.findById(surveyId).populate({
    path: "responses",
    model: Response,
  });

  if (!survey) {
    throw new Error("Survey not found");
  }

  return survey;
}

export async function getAllSurveys() {
  await dbConnect();

  // Obtener todas las encuestas con las respuestas relacionadas
  const surveys = await Survey.find({}).sort({ createdAt: -1 }).populate({
    path: "responses", // Nombre del campo de referencia
    model: Response, // Modelo relacionado
  });

  return surveys;
}

export async function createSurvey(data: {
  title: string;
  description?: string;
}) {
  await dbConnect();

  const { title, description } = data;

  if (!title) {
    throw new Error("El título es obligatorio");
  }

  const newSurvey = new Survey({
    title,
    description: description || "",
  });

  await newSurvey.save();

  revalidatePath("/dashboard"); // Forzar revalidación

  return {
    id: newSurvey._id.toString(),
    title: newSurvey.title,
    description: newSurvey.description,
    createdAt: newSurvey.createdAt,
    updatedAt: newSurvey.updatedAt,
  };
}
