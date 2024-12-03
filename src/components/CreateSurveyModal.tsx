"use client";

import { CreateSurveyForm } from "@/components/CreateSurveyForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

// Create Survey Modal Component, used in SurveyList Component
export function CreateSurveyModal() {
  // State to control the dialog open state
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* New Survey Button */}
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Nueva Encuesta
        </Button>
      </DialogTrigger>
      {/* New Survey Dialog Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Encuesta</DialogTitle>
          <DialogDescription>
            Completa los detalles para crear una nueva encuesta.
          </DialogDescription>
        </DialogHeader>
        {/* Create Survey Form */}
        <CreateSurveyForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
