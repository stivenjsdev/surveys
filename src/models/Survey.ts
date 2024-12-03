import { Document, Model, model, models, Schema, Types } from "mongoose";
import { ResponseType } from "./Response";

export type SurveyType = Document & {
  _id: Types.ObjectId;
  title: string;
  description: string;
  options: string[]; // No se utiliza actualmente ya que surveyOptions.ts maneja las 30 ops predefinidas
  responses?: ResponseType[];
  createdAt: Date;
  updatedAt: Date;
};

const SurveySchema = new Schema<SurveyType>(
  {
    title: String,
    description: String,
    options: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Campo virtual para las respuestas
SurveySchema.virtual("responses", {
  ref: "Response", // Modelo de referencia
  localField: "_id", // Campo en Survey
  foreignField: "surveyId", // Campo en Response
});

SurveySchema.set("toObject", { virtuals: true });
SurveySchema.set("toJSON", { virtuals: true });

export const Survey: Model<SurveyType> =
  models.Survey || model<SurveyType>("Survey", SurveySchema);
