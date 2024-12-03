import { Model, model, models, Schema, Types } from "mongoose";

export type ResponseType = Document & {
  _id: Types.ObjectId;
  surveyId: Types.ObjectId;
  fullName: string;
  selections: number[];
  createdAt: Date;
  updatedAt: Date;
};

const ResponseSchema = new Schema<ResponseType>(
  {
    surveyId: { type: Schema.Types.ObjectId, ref: "Survey" },
    fullName: String,
    selections: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

export const Response: Model<ResponseType> =
  models.Response || model<ResponseType>("Response", ResponseSchema);
