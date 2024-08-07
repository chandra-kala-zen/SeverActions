"use server";

import bcrypt from "bcryptjs";
import connectDB from "../../lib/db";
import SignupModel from "../../lib/studentmodel/signup";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  authenticated: boolean;
  success?: boolean;  // Adjust the return properties
  error?: string;
  data?: any;
}

export async function loginUser(formData: LoginData): Promise<LoginResponse> {
  try {
    await connectDB();

    const user = await SignupModel.findOne({ email: formData.email });
    if (!user) {
      return { authenticated: false, error: "User does not exist" };
    }

    const isPasswordValid = await bcrypt.compare(formData.password, user.password);
    if (!isPasswordValid) {
      return { authenticated: false, error: "Invalid password" };
    }

    console.log("User authenticated:", user);
    return { authenticated: true, success: true, data: user };  // Ensure correct return type
  } catch (error) {
    console.error("Error logging in:", error);
    return { authenticated: false, error: "Internal Server Error" };
  }
}

