import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 py-4 px-6 bg-background border-b">
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4" />
          <Input
            type="search"
            placeholder="Buscar encuestas..."
            className="pl-8 w-full sm:w-64"
          />
        </div>
        {/* <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button> */}
        <Button variant="ghost" size="sm" className="w-full sm:w-auto">
          Mi Perfil
        </Button>
      </div>
    </header>
  );
}
