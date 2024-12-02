import { surveyOptions } from "./surveyOptions";

type UserResponse = {
  userId: string;
  responses: number[];
};

// Datos mock de respuestas de usuarios
const mockResponses: UserResponse[] = [
  {
    userId: "user1",
    responses: [30, 15, 10, 5, 20, 25, 1, 7, 12, 18],
  },
  {
    userId: "user2",
    responses: [20, 15, 2, 30, 8, 11, 25, 7, 19, 22],
  },
  {
    userId: "user3",
    responses: [15, 30, 5, 10, 20, 1, 7, 25, 12, 18],
  },
  // Añade más respuestas mock según sea necesario
];

export function calculatePriorities(
  responses: UserResponse[]
): { id: number; text: string; score: number }[] {
  const scores: { [key: number]: number } = {};

  responses.forEach((userResponse) => {
    userResponse.responses.forEach((optionId, index) => {
      const score = 10 - index;
      scores[optionId] = (scores[optionId] || 0) + score;
    });
  });

  const prioritizedOptions = Object.entries(scores)
    .map(([id, score]) => ({
      id: parseInt(id),
      text:
        surveyOptions.find((option) => option.id === parseInt(id))?.text || "",
      score,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return prioritizedOptions;
}

export function getMockSurveyResults(surveyId: string) {
  // En una aplicación real, aquí se buscarían los resultados específicos para el surveyId
  return calculatePriorities(mockResponses);
}
