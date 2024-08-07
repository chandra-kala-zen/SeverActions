// "use server";

// import connectDB from "../../lib/db";
// import SignupModel from "../../lib/studentmodel/signup";
// import bcrypt from "bcryptjs";

// // Create a new signup
// export async function createSignup(formData: {
//   name: string;
//   email: string;
//   password: string;
// }) {
//   try {
//     await connectDB();

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(formData.password, 10);

//     // Create a new signup with the hashed password
//     const response = await SignupModel.create({
//       ...formData,
//       password: hashedPassword, // Use hashed password
//     });

//     console.log('New signup created:', response);
//     return { created: true, data: response };
//   } catch (error) {
//     console.error('Error creating signup:', error);
//     return { created: false, error: 'Internal Server Error' };
//   }
// }

// // Fetch all non-deleted signups
// export async function getAllSignups() {
//   try {
//     await connectDB();
//     const signups = await SignupModel.find({ deleted: false });
//     return { success: true, data: signups };
//   } catch (error) {
//     console.error("Error fetching signups:", error);
//     return { success: false, error: "Internal Server Error" };
//   }
// }

// // Update a signup
// export async function updateSignup(signupId: string, updatedData: Partial<{
//   name: string;
//   email: string;
//   password: string;
// }>) {
//   try {
//     await connectDB();

//     // Hash the new password if it's provided
//     if (updatedData.password) {
//       updatedData.password = await bcrypt.hash(updatedData.password, 10);
//     }

//     const updatedSignup = await SignupModel.findByIdAndUpdate(signupId, updatedData, { new: true });
//     if (!updatedSignup) {
//       return { success: false, error: 'Signup not found' };
//     }
//     console.log('Signup updated:', updatedSignup);
//     return { success: true, data: updatedSignup };
//   } catch (error) {
//     console.error('Error updating signup:', error);
//     return { success: false, error: 'Internal Server Error' };
//   }
// }

// // Soft delete a signup
// export async function softDeleteSignup(signupId: string) {
//   try {
//     await connectDB();
//     const signup = await SignupModel.findById(signupId);
//     if (!signup) {
//       return { success: false, error: 'Signup not found' };
//     }
//     signup.deleted = true;
//     await signup.save();
//     return { success: true, data: signup };
//   } catch (error) {
//     console.error('Error deleting signup:', error);
//     return { success: false, error: 'Internal Server Error' };
//   }
// }





// app/actions/signup.ts

"use server";

import connectDB from "../../lib/db";
import bcrypt from "bcryptjs";
import SignupModel from "../../lib/studentmodel/signup";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export async function createSignup(formData: SignupData) {
  try {
    await connectDB();

    const existingUser = await SignupModel.findOne({ email: formData.email });
    if (existingUser) {
      return { created: false, error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const response = await SignupModel.create({
      ...formData,
      password: hashedPassword,
    });

    console.log("New signup created:", response);
    return { created: true, data: response };
  } catch (error) {
    console.error("Error creating signup:", error);
    return { created: false, error: "Internal Server Error" };
  }
}

