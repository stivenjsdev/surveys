"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { surveyOptions } from "@/lib/surveyOptions";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Step = "name" | "select" | "prioritize";

export default function SurveyPage({ params }: { params: { id: string } }) {
  const [fullName, setFullName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [step, setStep] = useState<Step>("name");
  const router = useRouter();

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim()) {
      setStep("select");
    }
  };

  const handleOptionToggle = (optionId: number) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : prev.length < 10
        ? [...prev, optionId]
        : prev
    );
  };

  const handleContinue = () => {
    if (selectedOptions.length === 10) {
      setStep("prioritize");
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(selectedOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedOptions(items);
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar los resultados al servidor
    console.log("Nombre completo:", fullName);
    console.log("Opciones seleccionadas y priorizadas:", selectedOptions);
    router.push("/survey-complete");
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Encuesta de Gestión de Proyectos</CardTitle>
          <CardDescription>
            {step === "name" &&
              "Por favor, ingrese su nombre completo para comenzar."}
            {step === "select" &&
              "Seleccione 10 opciones que considere más importantes."}
            {step === "prioritize" &&
              "Ordene las opciones seleccionadas por prioridad (1 siendo la más importante)."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "name" && (
            <form onSubmit={handleNameSubmit}>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ingrese su nombre completo"
                  required
                />
              </div>
            </form>
          )}
          {step === "select" && (
            <div className="space-y-4">
              {surveyOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${option.id}`}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                    disabled={
                      selectedOptions.length === 10 &&
                      !selectedOptions.includes(option.id)
                    }
                  />
                  <label
                    htmlFor={`option-${option.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {step === "prioritize" && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="prioritize-list">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {selectedOptions.map((optionId, index) => (
                      <Draggable
                        key={optionId}
                        draggableId={optionId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-secondary p-3 rounded-md flex items-center space-x-2"
                          >
                            <span className="font-bold">{index + 1}.</span>
                            <span>
                              {
                                surveyOptions.find((o) => o.id === optionId)
                                  ?.text
                              }
                            </span>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === "name" && (
            <Button
              type="submit"
              onClick={handleNameSubmit}
              disabled={!fullName.trim()}
            >
              Comenzar Encuesta
            </Button>
          )}
          {step === "select" && (
            <Button
              onClick={handleContinue}
              disabled={selectedOptions.length !== 10}
            >
              Continuar ({selectedOptions.length}/10 seleccionadas)
            </Button>
          )}
          {step === "prioritize" && (
            <Button onClick={handleSubmit}>Enviar respuestas</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
