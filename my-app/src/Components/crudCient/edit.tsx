"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCrud } from "@/lib/crudActions";
import CrudTable from "./edit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Zod schema for validation
const CrudSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(1, "Age must be greater than 0")
    .max(120, "Age must be less than or equal to 120"),
});

// Define form data structure
interface CrudFormData {
  name: string;
  age: number;
}

function CrudClient() {
  // Use react-hook-form with Zod validation and define form data type
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CrudFormData>({
    resolver: zodResolver(CrudSchema),
  });

  // Form submission handler
  const onSubmit = async (data: CrudFormData) => {
    try {
      const result = await CreateCrud(data); // Passing form data to CreateCrud
      if (result.created) {
        reset(); // Reset form on success
      } else {
        console.log("Posting data errors");
      }
    } catch (error) {
      console.log("Errors:", error);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Entry</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}> {/* Corrected to form */}
        <FormField>
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              {...register("age", { valueAsNumber: true })}
              className={errors.age ? "border-red-500" : ""}
            />
            {errors.age && <FormMessage>{errors.age.message}</FormMessage>}
          </FormItem>
        </FormField>

        <Button type="submit" className="mt-4">Submit</Button>
      </form>

      {/* CRUD table to display existing data */}
      <CrudTable />
    </div>
  );
}

export default CrudClient;
