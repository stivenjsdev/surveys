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
import { deleteSurvey } from "@/lib/actions/surveyActions";
import { BarChart, ClipboardList, Trash } from "lucide-react";
import Link from "next/link";

interface SurveyListProps {
  surveys: {
    _id: string;
    title: string;
    description: string;
    options: string[];
    responses?: {
      _id: string;
      surveyId: string;
      fullName: string;
      selections: number[];
      createdAt: string;
      updatedAt?: string;
    }[];
    createdAt: string;
    updatedAt?: string;
  }[];
}

export function SurveyList({ surveys }: SurveyListProps) {
  const handleDelete = async (surveyId: string) => {
    try {
      await deleteSurvey(surveyId);
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Encuestas</h2>
        <CreateSurveyModal />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead>Respuestas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surveys.map((survey) => (
            <TableRow key={survey._id.toString()}>
              <TableCell className="font-medium">{survey.title}</TableCell>
              <TableCell>{survey.description}</TableCell>
              <TableCell>{survey.createdAt.split("T")[0]}</TableCell>
              <TableCell>{survey.responses?.length}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/survey/${survey._id}`}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Realizar Encuesta
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/survey/${survey._id}`}>
                      <BarChart className="mr-2 h-4 w-4" />
                      Ver Resultados
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
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
