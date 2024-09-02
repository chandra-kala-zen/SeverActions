import mongoose, { Document, Schema } from 'mongoose';

// Define the Product interface
interface Product extends Document {
  image: string[];
  name: string;
  cost: number;
  deleted: boolean; // Field for logical deletion
  softDelete: () => Promise<this>; // Method to soft delete
}
const ProductSchema: Schema = new Schema({
  image: { type: [String], required: true }, 
  name: { type: String, required: true, trim: true },
  cost: { type: Number, required: true, min: 0 },
  deleted: { type: Boolean, default: false }, // Default is false
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

// Add the softDelete method
ProductSchema.methods.softDelete = async function () {
  this.deleted = true;
  return await this.save();
};


const ProductModel =  mongoose.model<Product>('Product', ProductSchema);
export default ProductModel;
