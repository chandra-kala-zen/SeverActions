
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


export async function getAllStudents() {
  try {
    await connectDB();
    const profiles = await ProfileModel.find();
    return { success: true, data: profiles };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { success: false, error: "Internal Server Error" };
  }
}


export async function updateProfile(profileId: string, updatedData: Partial<{
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

// Delete a profile by ID
export async function deleteProfile(profileId: string) {
  try {
    await connectDB();
    const deletedProfile = await ProfileModel.findByIdAndDelete(profileId);
    if (!deletedProfile) {
      return { success: false, error: 'Profile not found' };
    }
    return { success: true, data: deletedProfile };
  } catch (error) {
    console.error('Error deleting profile:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}