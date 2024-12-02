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

export function CreateSurveyForm({ onSuccess }: CreateSurveyFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Aquí iría la lógica para enviar los datos al servidor
    console.log(values);
    setTimeout(() => {
      setIsLoading(false);
      form.reset();
      onSuccess?.();
    }, 2000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear Encuesta"}
        </Button>
      </form>
    </Form>
  );
}
