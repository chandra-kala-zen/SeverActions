"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { redirect } from "next/navigation";
import { createProfile } from "@/lib/studentactions";


const formSchema = z.object({
  studentname: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  initial: z.string().min(1, {
    message: "Student name must be at least 2 characters.",
  }),
  age: z.string().min(1, {
    message: "Age must be at least 1 character.",
  }),
  email: z.string().min(1, {
    message: "Invalid email address",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfileForm() {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset, formState: { errors } } = form;
  const onSubmit = async (data: FormValues) => {
    try {
      const result = await createProfile(data);
      if (result.created) {
        setSubmittedData(data); 
        redirect("/allData");
        reset();
      } else {
        throw new Error('Failed to submit data.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-[450px] m-auto max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Student Form Actions</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="studentname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.studentname ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your display name.
                  </FormDescription> */}
                  <FormMessage>{errors.studentname?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Intial</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your initial"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.initial ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your display name.
                  </FormDescription> */}
                  <FormMessage>{errors.initial?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your age"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Your current age.
                  </FormDescription> */}
                  <FormMessage>{errors.age?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="" disabled>Select an email</option>
                      <option value="m@example.com">m@example.com</option>
                      <option value="m@google.com">m@google.com</option>
                      <option value="m@support.com">m@support.com</option>
                    </select>
                  </FormControl>
                  {/* <FormDescription>
                    Select your email address.
                  </FormDescription> */}
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full "
            >
              Submit
            </Button>
          </form>
        </Form>
        </div>

        <div className="ml-auto w-[350px] mt-6">
          {submittedData && (
            <div>
              <pre className="mt-2 rounded-md bg-slate-950 p-4 text-white">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
       
      </div>
    </main>
  );
}
