import mongoose, { Document, Schema } from 'mongoose';
interface Profile extends Document {
  name: string;
  cost:number;
  image:string;
  deleted: boolean; // Ensure this field is present
  softDelete: () => Promise<this>;
}

const EXSchema: Schema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  image: { type: String, required: true},
  deleted: { type: Boolean, default: false }, // Default is false
});

// Add the softDelete method
EXSchema.methods.softDelete = async function () {
  this.deleted = true;
  return await this.save();
};

const EXModel = mongoose.models.Profile || mongoose.model<Profile>('Products', EXSchema);
export default EXModel;
