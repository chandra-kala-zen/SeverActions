// "use server";

// import connect from "@/utils/db";
// import crudModel from "@/models/crud";

// // Create a new entry
// export async function CreateCrud(data: { name: string; age: number }) {
//   try {
//     await connect();
//     const CrudData = await crudModel.create({ ...data, deleted: false }); // Ensure deleted is false on creation
//     console.log("Data is created successfully", CrudData);
//     return { created: true, data: CrudData };
//   } catch (error) {
//     console.error("Error while creating data", error);
//     return { created: false, error: "Internal error" };
//   }
// }

// // Get all CRUD entries (excluding soft-deleted ones)
// export async function GetCrud() {
//   try {
//     await connect();
//     const crudData = await crudModel.find({ deleted: false }).exec(); // Filter out deleted entries
//     console.log("Data retrieved successfully", crudData);
//     return { success: true, data: crudData };
//   } catch (error) {
//     console.error("Error while retrieving data", error);
//     return { success: false, error: "Internal error" };
//   }
// }

// // Get a single CRUD entry by ID 
// export async function GetCrudById(id: string) {
//   try {
//     await connect();
//     const crudData = await crudModel.findOne({ _id: id, deleted: false }).exec(); // Filter out deleted entries
//     if (!crudData) {
//       return { success: false, error: "Data not found" };
//     }
//     return { success: true, data: crudData };
//   } catch (error) {
//     console.error("Error while retrieving data", error);
//     return { success: false, error: "Internal error" };
//   }
// }

// // Edit an existing CRUD entry by ID
// export async function EditCrud(id: string, data: { name?: string; age?: number }) {
//   try {
//     await connect();
//     const updatedData = await crudModel.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true }).exec(); // Filter out deleted entries
//     if (!updatedData) {
//       return { success: false, error: "Data not found or already deleted" };
//     }
//     console.log("Data updated successfully", updatedData);
//     return { success: true, data: updatedData };
//   } catch (error) {
//     console.error("Error while updating data", error);
//     return { success: false, error: "Internal error" };
//   }
// }

// // Soft delete an existing CRUD entry by ID
// export async function SoftDeleteCrud(id: string) {
//   try {
//     await connect();
//     const crudData = await crudModel.findById(id);
//     if (!crudData) {
//       return { success: false, error: "Data not found" };
//     }
//   } catch (error) {
//     console.error("Error while soft deleting data", error);
//     return { success: false, error: "Internal error" };
//   }
// }


// export async function CreateCrud(data: { name: string; age: number }) {
//   try {
//     await connect();
//     const CrudData = await crudModel.create({ ...data }); // No need to set 'deleted' anymore
//     console.log("Data is created successfully", CrudData);
//     return { created: true, data: CrudData };
//   } catch (error) {
//     console.error("Error while creating data", error);
//     return { created: false, error: "Internal error" };
//   }
// }
'use server'

import crudModel from "@/models/crud";
import connect from "@/utils/db";

export default async function CreateCrud (data:{name : string ; age:number}){
  try{
    await connect();
    const CrudData = await crudModel.create({...data});
    console.log("data posted successfully" ,CrudData);
    return {created: true , data :CrudData};
  }catch(error){
    console.error("error", error);
    return{created:false , error : "internal error"};
  }
}