// This route or Component must be rendered dynamically (not statically)
export const dynamic = "force-dynamic";

import { DashboardHeader } from "@/components/DashboardHeader";
import { SurveyList } from "@/components/SurveyList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllSurveys } from "@/lib/actions/surveyActions";
import { Suspense } from "react";

// This is a simple skeleton component to show while the data is loading
function DashboardSurveyListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[250px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[125px]" />
        ))}
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  );
}

// Dashboard Page Component
export default async function DashboardPage() {
  // Fetch all surveys (Every time it is requested)
  const surveys = await getAllSurveys();

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
  const averageTime = "5m 13s"; // This would need to be calculated based on actual response data

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dashboard Header */}
      <DashboardHeader />
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Surveys Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Surveys */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Encuestas
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSurveys}</div>
              <p className="text-xs text-muted-foreground">
                +2 desde el último mes
              </p>
            </CardContent>
          </Card>
          {/* Total Answers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Respuestas Totales
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResponses}</div>
              <p className="text-xs text-muted-foreground">
                +15% desde el último mes
              </p>
            </CardContent>
          </Card>
          {/* Completion Rate */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa de Finalización
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completionRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2% desde el último mes
              </p>
            </CardContent>
          </Card>
          {/* Average Time */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tiempo Promedio
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageTime}</div>
              <p className="text-xs text-muted-foreground">
                -30s desde el último mes
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Survey List */}
        <Suspense fallback={<DashboardSurveyListSkeleton />}>
          <SurveyList surveys={surveys} />
        </Suspense>
      </main>
    </div>
  );
}
