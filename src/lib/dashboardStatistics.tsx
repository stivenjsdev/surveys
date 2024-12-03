import { ReactNode } from "react";
import { SerializedSurveyType } from "./actions/surveyActions";

export interface Statistic {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

export function getDashboardStatistics(
  surveys: SerializedSurveyType[]
): Statistic[] {
  // Calculate summary statistics
  const totalSurveys = surveys.length;
  //    Calculate total responses by summing the length of each survey's responses array
  const totalResponses = surveys.reduce(
    (sum, survey) => sum + (survey.responses?.length || 0),
    0
  );
  //   Calculate completion rate as a percentage of total responses to total surveys (this is a placeholder calculation)
  const completionRate =
    totalResponses > 0 ? (totalResponses / (totalSurveys * 100)) * 100 : 0;
  const averageTime = "5m 13s"; // Placeholder, puedes calcularlo dinámicamente

  return [
    {
      title: "Total Encuestas",
      value: totalSurveys,
      description: "+2 desde el último mes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Respuestas Totales",
      value: totalResponses,
      description: "+15% desde el último mes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Tasa de Finalización",
      value: `${completionRate.toFixed(1)}%`,
      description: "+2% desde el último mes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      title: "Tiempo Promedio",
      value: averageTime,
      description: "-30s desde el último mes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ];
}
