"use server";

import connectDB from "../../lib/db";
import ProductModel from "../../lib/studentmodel/example"; // Adjust the import path if necessary
import fs from "fs";
import path from "path";

interface Product {
  name: string;
  cost: number;
  image: string;
  deleted: boolean;
  softDelete: () => Promise<Product>;
}

// **Create** a new product
export async function createProduct(formData: {
  name: string;
  cost: number;
  image: string;
}): Promise<{ created: boolean; data?: Product; error?: string }> {
  try {
    await connectDB();
    const response = await ProductModel.create(formData);
    console.log("New product created:", response);
    return { created: true, data: response };
  } catch (error) {
    console.error("Error creating product:", error);
    return { created: false, error: "Internal Server Error" };
  }
}

// **Fetch all non-deleted products**
export async function getAllProducts(): Promise<{ success: boolean; data?: Product[]; error?: string }> {
  try {
    await connectDB();
    const products = await ProductModel.find({ deleted: false }, "name cost image"); // Fetch non-deleted products with their names, costs, and images
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

// **Update** a product's details by ID
export async function updateProduct(productId: string, updatedData: { name?: string; cost?: number; image?: string }): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    await connectDB();
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedData, { new: true, fields: "name cost image" });
    if (!updatedProduct) {
      return { success: false, error: "Product not found" };
    }
    console.log("Product updated:", updatedProduct);
    return { success: true, data: updatedProduct };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

// **Soft delete** a product
export async function softDeleteProduct(productId: string): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    await connectDB();
    const product = await ProductModel.findById(productId);
    if (!product) {
      return { success: false, error: "Product not found" };
    }
    await product.softDelete();
    return { success: true, data: product };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

// **Upload Image** and return the file path or URL
export async function uploadImage(image: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const uploadDir = path.join(process.cwd(), "uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, image.name);
    const fileStream = fs.createWriteStream(filePath);
    fileStream.write(Buffer.from(await image.arrayBuffer()));
    fileStream.close();

    // In a real scenario, you'd return a URL or some identifier
    // Here, we just return the path for demonstration purposes
    return { success: true, url: `/uploads/${image.name}` };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
