import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-background border-b">
      <h1 className="text-2xl font-bold">Survey Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar encuestas..."
            className="pl-8 w-64"
          />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm">
          Mi Perfil
        </Button>
      </div>
    </header>
  );
}
