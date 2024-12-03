// This route or Component must be rendered dynamically (not statically)
export const dynamic = "force-dynamic";

import { DashboardHeader } from "@/components/DashboardHeader";
import { StatisticCard } from "@/components/StatisticsCard";
import { SurveyList } from "@/components/SurveyList";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllSurveys } from "@/lib/actions/surveyActions";
import { getDashboardStatistics } from "@/lib/dashboardStatistics";
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

  // Calculate statistics
  const statistics = getDashboardStatistics(surveys);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dashboard Header */}
      <DashboardHeader />
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Surveys Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statistics?.map((stat, index) => (
            <StatisticCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>
        {/* Survey List */}
        <Suspense fallback={<DashboardSurveyListSkeleton />}>
          <SurveyList surveys={surveys} />
        </Suspense>
      </main>
    </div>
  );
}
