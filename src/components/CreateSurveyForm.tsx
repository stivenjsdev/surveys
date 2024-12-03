"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSurvey } from "@/lib/actions/surveyActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "El título es obligatorio",
  }),
  description: z.string().optional(),
});

interface CreateSurveyFormProps {
  onSuccess?: () => void;
}

// Create Survey Form Component, used in CreateSurveyModal
export function CreateSurveyForm({ onSuccess }: CreateSurveyFormProps) {
  // Loading state for the form
  const [isLoading, setIsLoading] = useState(false);

  // Form using react-hook-form and zod for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Submit handler for the form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    try {
      // Call the createSurvey action to create a new survey
      await createSurvey(values);
      // Reset the form and call the onSuccess callback
      form.reset();
      onSuccess?.(); // Close the modal
    } catch (error) {
      console.error("Error al crear la encuesta:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa el título de la encuesta"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Este será el título principal de tu encuesta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingresa una descripción para tu encuesta"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Proporciona más detalles sobre tu encuesta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear Encuesta"}
        </Button>
      </form>
    </Form>
  );
}
