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
import { saveSurveyResponse } from "@/lib/actions/surveyActions";
import { surveyOptions } from "@/lib/surveyOptions";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Step = "name" | "select" | "prioritize";

// SurveyPage component /survey/[id]
export default function SurveyPage() {
  // name of respondent
  const [fullName, setFullName] = useState("");
  // 10 selected options by respondent
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  // current step of the survey
  const [step, setStep] = useState<Step>("name"); // name, select, prioritize

  const router = useRouter();
  const params = useParams();
  // get survey ID from URL params (e.g. /survey/123) and discard any other array params
  const surveyId = Array.isArray(params.id) ? params.id[0] : params.id;

  // handle name submission in the first step
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim()) {
      setStep("select");
    }
  };

  // handle option selection in the second step
  const handleOptionToggle = (optionId: number) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : prev.length < 10
        ? [...prev, optionId]
        : prev
    );
  };

  // handle continue button click to move to the next step in the second step
  const handleContinue = () => {
    if (selectedOptions.length === 10) {
      setStep("prioritize");
    }
  };

  // handle drag and drop reordering of selected options in the last step
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(selectedOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedOptions(items);
  };

  // handle survey response submission in the last step
  const handleSubmit = async () => {
    console.log("Nombre completo:", fullName);
    console.log("Opciones seleccionadas y priorizadas:", selectedOptions);
    try {
      // check if survey ID is available
      if (!surveyId) throw new Error("El ID de la encuesta es requerido.");
      // save survey response to database
      await saveSurveyResponse(surveyId, fullName, selectedOptions);
      // redirect to survey complete page
      router.push("/survey-complete");
    } catch (error) {
      console.error("Error al guardar la respuesta:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Survey Steps card container */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          {/* Survey Title */}
          <CardTitle>Encuesta de Gestión de Proyectos</CardTitle>
          {/* Survey Step Description, changes according to the current step  */}
          <CardDescription>
            {step === "name" &&
              "Por favor, ingrese su nombre completo para comenzar."}
            {step === "select" &&
              "Seleccione 10 opciones que considere más importantes."}
            {step === "prioritize" &&
              "Ordene las opciones seleccionadas por prioridad (1 siendo la más importante)."}
          </CardDescription>
        </CardHeader>
        {/* Survey Step Content, changes according to the current step */}
        <CardContent>
          {/* Name Step */}
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
          {/* Select Step */}
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
          {/* Prioritize Step */}
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
        {/* Survey Step Footer and submit button, changes according to the current step */}
        <CardFooter className="flex justify-between">
          {/* name step */}
          {step === "name" && (
            <Button
              type="submit"
              onClick={handleNameSubmit}
              disabled={!fullName.trim()}
            >
              Comenzar Encuesta
            </Button>
          )}
          {/* select step */}
          {step === "select" && (
            <Button
              onClick={handleContinue}
              disabled={selectedOptions.length !== 10}
            >
              Continuar ({selectedOptions.length}/10 seleccionadas)
            </Button>
          )}
          {/* prioritize step */}
          {step === "prioritize" && (
            <Button onClick={handleSubmit}>Enviar respuestas</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
