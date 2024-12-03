"use server";

import { Response } from "@/models/Response";
import { Survey } from "@/models/Survey";
import { revalidatePath } from "next/cache";
import { dbConnect } from "../mongodb";
import { surveyOptions } from "../surveyOptions";

export type SerializedSurveyType = {
  _id: string;
  title: string;
  description: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  responses?: {
    _id: string;
    surveyId: string;
    fullName: string;
    selections: number[];
    createdAt: string;
    updatedAt: string;
  }[];
};

export async function getSurveyResults(surveyId: string) {
  await dbConnect();

  const survey = await Survey.findById(surveyId);
  if (!survey) {
    throw new Error("Survey not found");
  }

  const responses = await Response.find({ surveyId });

  const optionScores = surveyOptions.map((option) => ({
    id: option.id,
    text: option.text,
    score: 0,
  }));

  console.log("responses", responses);
  console.log("optionScores", optionScores);

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

export async function getAllSurveys(): Promise<SerializedSurveyType[]> {
  await dbConnect();

  // Obtener todas las encuestas con las respuestas relacionadas
  const surveys = await Survey.find({}).sort({ createdAt: -1 }).populate({
    path: "responses", // Nombre del campo de referencia
    model: Response, // Modelo relacionado
  });

  const surveysFormatted = surveys.map((survey) => ({
    _id: survey._id.toString(), // Convertir ObjectId a string
    title: survey.title,
    description: survey.description,
    options: survey.options,
    createdAt: survey.createdAt.toISOString(), // Convertir fecha a string ISO
    updatedAt: survey.updatedAt?.toISOString(), // Convertir fecha a string ISO si existe
    responses: survey.responses?.map((response) => ({
      _id: response._id.toString(), // Convertir ObjectId a string
      surveyId: response.surveyId.toString(), // Convertir ObjectId a string
      fullName: response.fullName,
      selections: response.selections,
      createdAt: response.createdAt.toISOString(), // Convertir fecha a string ISO
      updatedAt: response.updatedAt?.toISOString(), // Convertir fecha a string ISO si existe
    })),
  }));

  return surveysFormatted;
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

  revalidatePath("/dashboard"); // Forzar revalidar

  return {
    _id: newSurvey._id.toString(),
    title: newSurvey.title,
    description: newSurvey.description,
    createdAt: newSurvey.createdAt,
    updatedAt: newSurvey.updatedAt,
  };
}

export async function deleteSurvey(surveyId: string) {
  await dbConnect();

  // Verificar si la encuesta existe
  const survey = await Survey.findById(surveyId);
  if (!survey) {
    throw new Error("Survey not found");
  }

  // Eliminar todas las respuestas relacionadas
  await Response.deleteMany({ surveyId });

  // Eliminar la encuesta
  await Survey.findByIdAndDelete(surveyId);

  // Revalidar la ruta del dashboard
  revalidatePath("/dashboard");
}
