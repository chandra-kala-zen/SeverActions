"use client";

import { useState, useEffect } from 'react';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProduct, getProducts } from '@/lib/product';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

// Define schema
const productSchema = z.object({
  image: z.array(z.string().url()).nonempty('At least one image URL is required'),
  name: z.string().min(1, 'Product name is required'),
  cost: z.number().min(0, 'Cost must be a positive number'),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onBlur',
    defaultValues: {
      image: [],
      name: '',
      cost: 0,
    },
  });

  const { handleSubmit, reset, formState: { errors } } = form;

  // Fetch products on page load
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts();
        if (response.success) {
          setProducts(response.data as ProductFormData[]);
        } else {
          console.error('Failed to fetch products:', response.error);
        }
      } catch (error) {
        console.error('An error occurred while fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await createProduct(data);
      if (response.success) {
        setSuccessMessage('Product created successfully!');
        setTimeout(() => setSuccessMessage(null), 2000);
        reset();

        const fetchProductsResponse = await getProducts();
        if (fetchProductsResponse.success) {
          setProducts(fetchProductsResponse.data as ProductFormData[]);
        }
      } else {
        console.error('Creation failed:', response.error);
      }
    } catch (error) {
      console.error('An error occurred while creating the product:', error);
    }
  };

  return (
    <div className="container p-5">
      <h1>Product Management</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="image"
            render={({ field }) => (
              <FormControl>
                <div>
                  <FormLabel htmlFor="image">Image URLs (comma separated)</FormLabel>
                  <Input
                    id="image"
                    placeholder="Enter image URLs separated by commas"
                    {...field}
                    className={`border ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                    // Handle array input logic
                  />
                  <FormMessage>{errors.image?.message}</FormMessage>
                </div>
              </FormControl>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormControl>
                <div>
                  <FormLabel htmlFor="name">Product Name</FormLabel>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    {...field}
                    className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <FormMessage>{errors.name?.message}</FormMessage>
                </div>
              </FormControl>
            )}
          />
          <FormField
            name="cost"
            render={({ field }) => (
              <FormControl>
                <div>
                  <FormLabel htmlFor="cost">Cost</FormLabel>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="Enter cost"
                    {...field}
                    className={`border ${errors.cost ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <FormMessage>{errors.cost?.message}</FormMessage>
                </div>
              </FormControl>
            )}
          />
          <Button type="submit">Create Product</Button>
        </form>
      </Form>
      {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      <h2 className="mt-8">Products List</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li className="flex justify-between items-center border p-2 rounded-md">
            <div>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Cost:</strong> ${product.cost}</p>
              <div>
                <strong>Images:</strong>
                <ul>
                  {product.image.map((imgUrl, index) => (
                    <li key={index}><img src={imgUrl} alt={`Product image ${index + 1}`} className="w-20 h-20 object-cover" /></li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
