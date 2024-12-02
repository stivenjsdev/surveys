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
import { BarChart, ClipboardList } from "lucide-react";
import Link from "next/link";

type Survey = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  responses: number;
};

const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Satisfacción del Cliente",
    description: "Encuesta para medir la satisfacción de nuestros clientes",
    createdAt: "2023-05-15",
    responses: 150,
  },
  {
    id: "2",
    title: "Evaluación de Producto",
    description: "Feedback sobre nuestro nuevo producto",
    createdAt: "2023-06-01",
    responses: 89,
  },
  {
    id: "3",
    title: "Experiencia de Usuario",
    description:
      "Encuesta sobre la experiencia de usuario en nuestra plataforma",
    createdAt: "2023-06-15",
    responses: 120,
  },
];

export function SurveyList() {
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
          {mockSurveys.map((survey) => (
            <TableRow key={survey.id}>
              <TableCell className="font-medium">{survey.title}</TableCell>
              <TableCell>{survey.description}</TableCell>
              <TableCell>{survey.createdAt}</TableCell>
              <TableCell>{survey.responses}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/survey/${survey.id}`}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Realizar Encuesta
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/survey/${survey.id}`}>
                      <BarChart className="mr-2 h-4 w-4" />
                      Ver Resultados
                    </Link>
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
