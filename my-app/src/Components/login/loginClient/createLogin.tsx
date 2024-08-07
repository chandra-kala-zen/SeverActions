"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/lib/login";
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const { handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      if (response.authenticated && response.success) {
        console.log("User logged in successfully");
        router.push('/dashboard'); // Redirect to dashboard after successful login
      } else {
        console.error("Login failed:", response.error);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="shadow-custom-dark p-5 bg-blue-50 mt-3 gap-4 flex flex-col items-between rounded-[50px] w-[500px] m-auto">
      <div className="items-center text-center m-auto">
        <img src="ama.jpeg" alt="amazon" className="w-[50px] h-[50px] rounded-[50%] m-auto" />
        <h1 className="font-bold">✨✨ Welcome to Login</h1>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                    placeholder="Enter Your Password"
                    {...field}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </FormControl>
                <FormMessage>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="font-bold">
            Login
          </Button>
        </form>
      </Form>
      <h1 className="text-right mt-4">
        Don't have an account?{" "}
        <Link className="text-blue-400" href="/signupClient">
          Sign Up
        </Link>
      </h1>
    </div>
  );
}

export default LoginPage;
