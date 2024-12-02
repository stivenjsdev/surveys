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

export function CreateSurveyModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Nueva Encuesta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Encuesta</DialogTitle>
          <DialogDescription>
            Completa los detalles para crear una nueva encuesta.
          </DialogDescription>
        </DialogHeader>
        <CreateSurveyForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
