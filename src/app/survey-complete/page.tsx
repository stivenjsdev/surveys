import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SurveyCompletePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>¡Encuesta Completada!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Gracias por completar la encuesta. Sus respuestas han sido
            registradas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
