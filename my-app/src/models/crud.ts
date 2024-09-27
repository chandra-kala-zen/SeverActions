// import mongoose, { Document, Schema, Model } from 'mongoose';

// // Define the interface for the Crud document
// interface Crud extends Document {
//   name: string;
//   age: number;
//   deleted: boolean;
//   softDelete: () => Promise<this>;
// }

// // Define the schema for the Crud model
// const crudSchema: Schema<Crud> = new Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   deleted: { type: Boolean, default: false },
// });

// // Add the softDelete method to the schema
// crudSchema.methods.softDelete = async function () {
//   this.deleted = true;
//   return await this.save();
// };

// // Define the model, ensuring correct model registration
// const crudModel: Model<Crud> = mongoose.models.Crud || mongoose.model<Crud>('Crud', crudSchema);

// export default crudModel;

import mongoose ,{Document,Schema, Model} from 'mongoose' ;

interface Crud extends Document {
  name : string;
  age : number;
}

const CrudSchema : Schema <Crud> = new Schema({
  name : {type:String ,required:true},
  age:{type:Number , required :true}
})

const crudModel:Model<Crud> = mongoose.models.Crud || mongoose.model<Crud>('Crud',CrudSchema);
export default crudModel;