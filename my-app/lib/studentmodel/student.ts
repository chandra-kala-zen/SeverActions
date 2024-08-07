import mongoose, { Document, Schema } from 'mongoose';
interface Profile extends Document {
  studentname: string;
  initial: string;
  age: string;
  email: string;
  deleted: boolean; // Ensure this field is present
  softDelete: () => Promise<this>;
}

const ProfileSchema: Schema = new Schema({
  studentname: { type: String, required: true },
  initial: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  deleted: { type: Boolean, default: false }, // Default is false
});

// Add the softDelete method
ProfileSchema.methods.softDelete = async function () {
  this.deleted = true;
  return await this.save();
};

const ProfileModel = mongoose.models.Profile || mongoose.model<Profile>('Profile', ProfileSchema);
export default ProfileModel;
