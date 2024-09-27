// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import CreateCrud from "@/lib/crudActions";

// // Zod schema for validation
// const CrudSchema = z.object({
//   name: z.string().min(1, "Name is required").max(50, "Name is too long"),
//   age: z
//     .number()
//     .min(1, "Age must be greater than 0")
//     .max(120, "Age must be less than or equal to 120"),
// });

// // Define form data structure
// interface CrudFormData {
//   name: string;
//   age: number;
// }

// function CrudClient() {
//   // Use react-hook-form with Zod validation and define form data type
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<CrudFormData>({
//     resolver: zodResolver(CrudSchema),
//   });

//   // Form submission handler
//   const onSubmit = async (data: CrudFormData) => {
//     try {
//       const result = await CreateCrud(data); 
//       if (result.created) {
//         reset(); 
//       } else {
//         console.log("Posting data errors");
//       }
//     } catch (error) {
//       console.log("Errors:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <input
//             type="text"
//             placeholder="Enter your name please"
//             {...register("name")}
//           />
//           {errors.name && <p>{errors.name.message as string}</p>}
//         </div>

//         <div>
//           <input
//             type="number"
//             placeholder="Enter your age here"
//             {...register("age", { valueAsNumber: true })}
//           />
//           {errors.age && <p>{errors.age.message as string}</p>}
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default CrudClient;

// "use client";

// import { useForm, FormProvider } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";  // Shadcn Input component
// import { Button } from "@/components/ui/button";  // Shadcn Button component
// import CreateCrud from "@/lib/crudActions";
// import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// // Zod schema for validation
// const CrudSchema = z.object({
//   name: z.string().min(1, "Name is required").max(50, "Name is too long"),
//   age: z
//     .number()
//     .min(1, "Age must be greater than 0")
//     .max(120, "Age must be less than or equal to 120"),
// });

// // Define form data structure
// interface CrudFormData {
//   name: string;
//   age: number;
// }

// function CrudClient() {
//   // Use react-hook-form with Zod validation and define form data type
//   const methods = useForm<CrudFormData>({
//     resolver: zodResolver(CrudSchema),
//     mode: "onChange", // Validate on every change
//     reValidateMode: "onChange", // Re-validate on change after failed validation
//     shouldFocusError: true, // Auto-focus the first invalid field
//   });

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = methods;

//   // Form submission handler
//   const onSubmit = async (data: CrudFormData) => {
//     try {
//       console.log("Submitting data:", data);  // Log data being submitted
//       const result = await CreateCrud(data);
//       if (result.created) {
//         reset(); 
//         console.log("Data posted successfully", result.data);
//       } else {
//         console.error("Posting data failed", result);
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       {/* Wrap form in FormProvider */}
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Name Field */}
//           <FormItem>
//             <FormLabel>Name</FormLabel>
//             <FormControl>
//               <Input
//                 type="text"
//                 placeholder="Enter your name"
//                 {...register("name")}
//               />
//             </FormControl>
//             {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
//           </FormItem>

//           {/* Age Field */}
//           <FormItem>
//             <FormLabel>Age</FormLabel>
//             <FormControl>
//               <Input
//                 type="number"
//                 placeholder="Enter your age"
//                 {...register("age", { valueAsNumber: true })}
//               />
//             </FormControl>
//             {errors.age && <FormMessage>{errors.age.message}</FormMessage>}
//           </FormItem>

//           {/* Submit Button */}
//           <Button type="submit" className="mt-4">
//             Submit
//           </Button>
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

// export default CrudClient;


"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CreateCrud from "@/lib/crudActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  age: z
      .number()
      .min(1, "Age must be greater than 0")
      .max(120, "Age must be less than or equal to 120"),
})


interface CrudFormData 
{
  name:string;
  age :number;
}
function CrudClient(){

 
const methods = useForm<CrudFormData >({
  resolver:zodResolver(formSchema),
  mode: "onChange",
  reValidateMode: "onChange",
  shouldFocusError: true,
});


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods
  const onSubmit = async(data:CrudFormData) =>{
    try{
      const createCrud = await CreateCrud(data);
      if(createCrud.created){
        reset();
        console.log("created sucessfully crud",createCrud.data);
      }else{
        console.log("error while creating crud");
      }
      
    }catch(error){
        console.log("error while creating data" , error)
    }
  };
  return(
    <div>
      <FormProvider {...methods}>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter name"  {...register("name")} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
              
        </FormItem>
            <FormItem>
              <FormLabel>Userage</FormLabel>
              <FormControl>
                <Input placeholder="Enter age"   {...register("age", { valueAsNumber: true })}/>
              </FormControl>
              <FormDescription>
                This is your public display age.
              </FormDescription>
            
              {errors.age && <FormMessage>{errors.age.message}</FormMessage>}

            </FormItem>
    
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider >

    </div>
  )
}
export default CrudClient;
