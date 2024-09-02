'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { createHospital } from "@/lib/hospitalActions";
// Define the schema using zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Hospital name must be at least 2 characters.",
  }),
  age: z.number().min(0, {
    message: "Age must be a positive number.",
  }),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
  height: z.number().min(0, {
    message: "Height must be a positive number.",
  }),
  weight: z.number().min(0, {
    message: "Weight must be a positive number.",
  }),
  contact: z.string().min(10, {
    message: "Contact must be at least 10 characters.",
  }),
  problem: z.string().min(5, {
    message: "Problem description must be at least 5 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function HospitalForm() {
  const router = useRouter(); // Use router for client-side redirection

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  // Destructure necessary methods and states from the form
  const { handleSubmit, reset, formState: { errors } } = form;

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      const result = await createHospital(data);
      if (result.created) {
        reset(); // Reset the form after successful submission
        router.push("/hospitalmanagement"); // Redirect to another page
      } else {
        throw new Error(result.error || "Failed to submit data.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-[450px] m-auto max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Hospital Form Actions</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter hospital name"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
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
                      type="number"
                      placeholder="Enter age"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.age?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="" disabled>Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage>{errors.gender?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter height"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.height ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.height?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.weight?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter contact number"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.contact?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe the problem"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.problem ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.problem?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter address"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}