"use client";

import { CreateSurveyModal } from "@/components/CreateSurveyModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteSurvey,
  SerializedSurveyType,
} from "@/lib/actions/surveyActions";
import { BarChart, ClipboardList, Trash } from "lucide-react";
import Link from "next/link";

interface SurveyListProps {
  surveys: SerializedSurveyType[];
}

export function SurveyList({ surveys }: SurveyListProps) {
  // handler to delete a survey
  const handleDelete = async (surveyId: string) => {
    try {
      // Call the deleteSurvey server action
      await deleteSurvey(surveyId);
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Title and New survey button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Encuestas</h2>
        <CreateSurveyModal />
      </div>
      {/* Table of surveys */}
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead>Respuestas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        {/* Body */}
        <TableBody>
          {surveys.map((survey) => (
            <TableRow key={survey._id.toString()}>
              <TableCell className="font-medium">{survey.title}</TableCell>
              <TableCell>{survey.description}</TableCell>
              <TableCell>{survey.createdAt.split("T")[0]}</TableCell>
              <TableCell>{survey.responses?.length}</TableCell>
              {/* Actions Cell */}
              <TableCell>
                <div className="flex space-x-2">
                  {/* Take Survey Action */}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/survey/${survey._id}`}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Realizar Encuesta
                    </Link>
                  </Button>
                  {/* View Results Action */}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/survey/${survey._id}`}>
                      <BarChart className="mr-2 h-4 w-4" />
                      Ver Resultados
                    </Link>
                  </Button>
                  {/* Delete Action */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(survey._id.toString())}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
