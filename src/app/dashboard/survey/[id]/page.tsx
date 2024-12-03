import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSurveyResults } from "@/lib/actions/surveyActions";

interface SurveyResultsProps {
  params: Promise<{ id: string }>;
}

// Survey Results Page Component /dashboard/survey/[id]
export default async function SurveyResultsPage({
  params,
}: SurveyResultsProps) {
  // Get the survey id from the params
  const { id } = await params;
  // Fetch the survey results
  const results = await getSurveyResults(id);
  // Get the maximum score to calculate the progress bar
  const maxScore = Math.max(...results.map((r) => r.score));

  return (
    <div className="container mx-auto py-8 px-2">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Resultados de la Encuesta</CardTitle>
          <CardDescription>
            Las 10 opciones más prioritarias según las respuestas de los
            usuarios
          </CardDescription>
        </CardHeader>
        {/* 10 most priority options */}
        <CardContent>
          <div className="space-y-6">
            {results.map((result, index) => (
              <div key={result.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  {/* numeration and option text */}
                  <span className="font-medium">
                    {index + 1}. {result.text}
                  </span>
                  {/* score */}
                  <span className="text-sm text-muted-foreground">
                    {result.score} puntos
                  </span>
                </div>
                {/* progress bar */}
                <Progress
                  value={(result.score / maxScore) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
