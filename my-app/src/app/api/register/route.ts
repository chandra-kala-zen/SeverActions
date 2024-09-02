import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const POST = async (request: Request) => {
  try {
    // Extract email and password from the request body
    const { email, password } = await request.json();
    // Connect to the database
    await connect();
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();
    return new NextResponse("User created successfully", { status: 201 });
  } catch (err: any) {
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
};
