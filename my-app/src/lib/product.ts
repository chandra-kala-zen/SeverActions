import connectDB from '../../lib/db';
import ProductModel from '../../lib/studentmodel/product';

// Create a product
export async function createProduct(data: { image: string[]; name: string; cost: number }) {
  try {
    await connectDB();
    const product = await ProductModel.create(data);
    return { success: true, data: product };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}

// Get all products
export async function getProducts() {
    try {
      await connectDB();
      // Fetch products where 'deleted' field is false
      const products = await ProductModel.find({ deleted: false });
      return { success: true, data: products };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, error: 'Internal Server Error' };
    }
  }

// Update a product
export async function updateProduct(id: string, data: { image?: string[]; name?: string; cost?: number }) {
  try {
    await connectDB();
    const product = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    return { success: true, data: product };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}

// Soft delete a product
export async function softDeleteProduct(id: string) {
  try {
    await connectDB();
    const product = await ProductModel.findById(id);
    if (product) {
      await product.softDelete();
      return { success: true };
    }
    return { success: false, error: 'Product not found' };
  } catch (error) {
    console.error('Error soft deleting product:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}
