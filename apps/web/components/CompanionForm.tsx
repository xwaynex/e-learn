"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  // FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  // SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/app/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Companion is required"),
  subject: z.string().min(2, "Subject is required"),
  topic: z.string().min(2, "Topic is required"),
  voice: z.string().min(2, "Voice is required"),
  style: z.string().min(2, "Style is required"),
  duration: z.coerce.number<number>().min(2, "Duration is required"),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);

    const companion = await createCompanion(data);

    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      console.log("Failed to create companion");
      redirect("/");
    }
  }

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Bug Report</CardTitle> */}
        {/* <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Companion Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter companion name"
                    autoComplete="off"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Subject</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="input capitalize"
                    >
                      <SelectValue placeholder="Select the subject" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {/* <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator /> */}
                      {subjects.map((subject) => (
                        <SelectItem
                          key={subject}
                          value={subject}
                          className="capitalize"
                        >
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-topic">
                    What should the companion help with?
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-topic"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex. Derivatives & integrals"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="voice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-voice">Voice</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-voice"
                      aria-invalid={fieldState.invalid}
                      className="input capitalize"
                    >
                      <SelectValue placeholder="Select the voice" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="style"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-style">Style</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-style"
                      aria-invalid={fieldState.invalid}
                      className="input capitalize"
                    >
                      <SelectValue placeholder="Select the style" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-duration">
                    Estimated session duration in minutes
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-duration"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="15"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="w-full cursor-pointer"
          >
            Build your Companion
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default CompanionForm;
