"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSignup } from "@/lib/signup";
import { useRouter } from 'next/navigation';

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

function Page() {
  const router = useRouter();
  
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const { handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await createSignup(data);
      if (response.created) {
        console.log("User signed up successfully");
        router.push('/login'); // Redirect to login page after successful signup
      } else {
        console.error("Signup failed:", response.error);
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    }
  };

  return (
    <div className="shadow-custom-dark p-5 bg-blue-50 mt-3 gap-4 flex flex-col items-between rounded-[50px] w-[500px] m-auto">
      <div className="items-center text-center m-auto">
        <img src="ama.jpeg" alt="amazon" className="w-[50px] h-[50px] rounded-[50%] m-auto" />
        <h1 className="font-bold">✨✨ Welcome to Amazon</h1>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Enter Name"
                    {...field}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </FormControl>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    {...field}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create Your Password"
                    {...field}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </FormControl>
                <FormMessage>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="font-bold">
            Sign Up
          </Button>
        </form>
      </Form>
      <h1 className="text-right mt-4">
        Already have an account?{" "}
        <Link className="text-blue-400" href="/login">
          Login
        </Link>
      </h1>
    </div>
  );
}

export default Page;
