import mongoose, { Document, Schema } from 'mongoose';

interface Profile extends Document {
  studentname: string;
  intial: string;
  age: string;
  email: string;
}

const ProfileSchema: Schema = new Schema({
  studentname: { type: String, required: true },
  intial: { type: String, required: true },
  age: { type: String, required: true },
  email: {
    type: String,
    required: true,                                                         
  },
});

const ProfileModel = mongoose.models.Profile || mongoose.model<Profile>('Profile', ProfileSchema);

export default ProfileModel;
