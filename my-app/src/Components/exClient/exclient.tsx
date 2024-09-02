// "use client";

// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { createProduct, uploadImage } from "@/lib/example";

// // Define the validation schema using Zod
// const productSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   cost: z.number().min(0, { message: "Cost must be a positive number" }),
//   image: z.instanceof(File).refine(file => file.size > 0, { message: "Image is required" }),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// const ProductForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: "",
//       cost: 0,
//       image: null,
//     },
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       if (acceptedFiles.length > 0) {
//         setValue("image", acceptedFiles[0], { shouldValidate: true });
//       }
//     },
//     [setValue]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/*",
//     maxFiles: 1,
//   });

//   const onSubmit = async (formData: ProductFormData) => {
//     // Upload the image using the server action
//     const uploadResult = await uploadImage(formData.image);

//     if (!uploadResult.success || !uploadResult.url) {
//       setError(uploadResult.error || "Image upload failed");
//       return;
//     }

//     // Call the server action directly with the image URL
//     const result = await createProduct({ ...formData, image: uploadResult.url });

//     if (result.created) {
//       setSuccess("Product created successfully!");
//     } else {
//       setError(result.error || "Failed to create product");
//     }
//   };

//   return (
//     <div>
//       <h2>Create Product</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="name">Product Name:</label>
//           <input
//             id="name"
//             {...register("name")}
//           />
//           {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
//         </div>
//         <div>
//           <label htmlFor="cost">Cost:</label>
//           <input
//             type="number"
//             id="cost"
//             {...register("cost", { valueAsNumber: true })}
//           />
//           {errors.cost && <p style={{ color: "red" }}>{errors.cost.message}</p>}
//         </div>
//         <div {...getRootProps()} style={{ border: "1px dashed #ccc", padding: "20px", textAlign: "center" }}>
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p>Drop the image here...</p>
//           ) : (
//             <p>Drag & drop an image here, or click to select a file</p>
//           )}
//         </div>
//         <Controller
//           name="image"
//           control={control}
//           render={({ field }) => (
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
//             />
//           )}
//         />
//         {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
//         <button type="submit">Submit</button>
//       </form>
//       {success && <p style={{ color: "green" }}>{success}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default ProductForm;
