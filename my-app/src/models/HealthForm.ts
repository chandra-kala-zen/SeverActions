import mongoose, { Document, Schema, Model } from 'mongoose';

interface Hospital extends Document {
  name: string;
  age: number;
  gender: string;
  weight:number;
  height: number;
  contact:string;
  problem: string;
  address:string;
  deleted: boolean;
  softDelete: () => Promise<this>;
}

const HospitalSchema: Schema<Hospital> = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  contact: { type: String, required: true },
  problem: { type: String, required: true },
  address: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

// Add the softDelete method
HospitalSchema.methods.softDelete = async function () {
  this.deleted = true;
  return await this.save();
};

// Check if the model already exists before defining it
const HospitalModel: Model<Hospital> = mongoose.models.healthdetails || mongoose.model<Hospital>('healthdetails', HospitalSchema);

export default HospitalModel;