import { CreateSurveyForm } from "@/components/CreateSurveyForm";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <CreateSurveyForm />
    </div>
  );
}
