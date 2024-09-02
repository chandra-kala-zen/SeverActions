
"use server";
import connectDB from "../../lib/db";
import ProfileModel from "../../lib/studentmodel/student";

export async function createProfile(formData: {
}) {
  try {
    await connectDB();
    const response = await ProfileModel.create(formData);
    console.log('New profile created:', response);
    return { created: true, data: response };
  } catch (error) {
    console.error('Error creating profile:', error);
    return { created: false, error: 'Internal Server Error' };
  }
}

// Fetch all non-deleted students
export async function getAllStudents() {
  try {
    await connectDB();
    const profiles = await ProfileModel.find({ deleted: false }); // Only fetch non-deleted students
    return { success: true, data: profiles };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

// Update a student's profile
export async function updateProfile(profileId: string, updatedData: Partial<{
  studentname: string;
  initial: string;
  age: string;
  email: string;
}>) {
  try {
    await connectDB();
    const updatedProfile = await ProfileModel.findByIdAndUpdate(profileId, updatedData, { new: true });
    if (!updatedProfile) {
      return { success: false, error: 'Profile not found' };
    }
    console.log('Profile updated:', updatedProfile);
    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}

// Soft delete a student profile
export async function softDeleteProfile(profileId: string) {
  try {
    await connectDB();
    const profile = await ProfileModel.findById(profileId);
    if (!profile) {
      return { success: false, error: 'Profile not found' };
    }
    await profile.softDelete();
    return { success: true, data: profile };
  } catch (error) {
    console.error('Error deleting profile:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}
