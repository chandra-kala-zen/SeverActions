"use server";

import HospitalModel from "@/models/HealthForm";
import connect from "@/utils/db";

export async function createHospital(formData: {
  name: string;
  age: number;
  gender: string;
  height: number;
  contact:string;
  weight:number;
  address:string;
  problem: string;
}) {
  try {
    await connect();
    const newHospital = await HospitalModel.create({ ...formData, deleted: false });
    console.log('New hospital record created:', newHospital);
    return { created: true, data: newHospital };
  } catch (error) {
    console.error('Error creating hospital record:', error);
    return { created: false, error: 'Internal Server Error' };
  }
}


export async function getAllHospitals() {
  try {
    await connect();
    const hospitals = await HospitalModel.find({ deleted: false }).exec();
    return { success: true, data: hospitals };
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}


export async function updateHospital(id: string, formData: Partial<{
  name: string;
  age: number;
  gender: string;
  height: number; 
  contact:string;
  weight:number;
  address:string;
  problem: string;
}>) {
  try {
    await connect();
    const updatedHospital = await HospitalModel.findByIdAndUpdate(id, formData, { new: true }).exec();
    return { success: true, data: updatedHospital };
  } catch (error) {
    console.error('Error updating hospital:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}


export async function softDeleteHospital(id: string) {
  try {
    await connect();
    const hospital = await HospitalModel.findById(id);
    if (!hospital) {
      throw new Error('Hospital not found');
    }
    await hospital.softDelete();
    return { success: true, data: hospital };
  } catch (error) {
    console.error('Error soft deleting hospital:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}
