
type data ={
    id:number;
    name: string;
    email:string;
}
async function page(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
    return(
        <div>
            {
                data.map((data:data)=>(
                    <div key={data.id}>
                        <h1>{data.name}</h1>
                        </div>
                ))
            };
        </div>
    )
}
export default page;










// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { getAllStudents, updateProfile } from '@/lib/studentactions';
// import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';

// // Define the Student type with specific email types
// type Student = {
//   _id: string;
//   studentname: string;
//   intial: string;
//   age: string;
//   email: string;
// };

// const StudentTable = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [editingStudent, setEditingStudent] = useState<Student | null>(null);
//   const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Initialize React Hook Form
//   const { register, handleSubmit, reset } = useForm<Student>();

//   // Fetch all students
//   useEffect(() => {
//     async function fetchStudents() {
//       setLoading(true);
//       const result = await getAllStudents();
//       setLoading(false);
//       if (result.success && result.data) {
//         setStudents(result.data as Student[]);
//       } else {
//         setError(result.error || 'Unknown error');
//       }
//     }
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     if (editingStudent) {
//       reset(editingStudent);
//     }
//   }, [editingStudent, reset]);

//   // Handle edit student
//   const onEdit: SubmitHandler<Student> = async (data) => {
//     if (editingStudent) {
//       const response = await updateProfile(editingStudent._id, data);
//       if (response.success && response.data) {
//         setStudents((prevStudents) =>
//           prevStudents.map((student) =>
//             student._id === editingStudent._id ? response.data : student
//           )
//         );
//         setEditingStudent(null);
//         reset();
//       } else {
//         setError(response.error || 'Unknown error');
//       }
//     }
//   };

//   // Handle delete confirmation
//   const confirmDelete = (student: Student) => {
//     setStudentToDelete(student);
//   };

//   // Handle delete student in browser only
//   const handleDelete = () => {
//     if (studentToDelete) {
//       setStudents((prevStudents) =>
//         prevStudents.filter((student) => student._id !== studentToDelete._id)
//       );
//       setStudentToDelete(null);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto scroll-auto h-[300px] p-4">
//       <h2 className="text-2xl font-semibold mb-4">Student Management</h2>
//       <Table className="min-w-full bg-white border border-gray-300">
//         <TableHeader>
//           <TableRow className='text-red-300'>
//             <TableHead className="py-2 px-4 border-b text-bold text-blue-500">Name</TableHead>
//             <TableHead className="py-2 px-4 border-b text-bold text-blue-500">Initial</TableHead>
//             <TableHead className="py-2 px-4 border-b text-bold text-blue-500">Age</TableHead>
//             <TableHead className="py-2 px-4 border-b text-bold text-blue-500">Email</TableHead>
//             <TableHead className="py-2 px-4 border-b text-bold text-blue-500">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {students.map((student) => (
//             <TableRow key={student._id}>
//               <TableCell className="py-2 px-4 border-b text-left">{student.studentname}</TableCell>
//               <TableCell className="py-2 px-4 border-b">{student.intial}</TableCell>
//               <TableCell className="py-2 px-4 border-b">{student.age}</TableCell>
//               <TableCell className="py-2 px-4 border-b">{student.email}</TableCell>
//               <TableCell className="py-2 px-4 border-b">
//                 <div className="text-red-500 bg-400-blue">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <button className="w-[15px]" onClick={() => setEditingStudent(student)}>
//                         <img src="edit.png" alt="Edit" />
//                       </button>
//                     </PopoverTrigger>
//                     <PopoverContent>
//                       {editingStudent && editingStudent._id === student._id && (
//                         <div className="mt-4">
//                           <h3 className="text-xl font-semibold mb-2">Edit Student</h3>
//                           <Form onSubmit={handleSubmit(onEdit)} className="space-y-4">
//                             <FormField>
//                               <FormItem>
//                                 <FormLabel>Name</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     {...register('studentname')}
//                                     placeholder="Name"
//                                     defaultValue={editingStudent.studentname}
//                                     required
//                                   />
//                                 </FormControl>
//                               </FormItem>
//                             </FormField>
//                             <FormField>
//                               <FormItem>
//                                 <FormLabel>Initial</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     {...register('intial')}
//                                     placeholder="Initial"
//                                     defaultValue={editingStudent.intial}
//                                     required
//                                   />
//                                 </FormControl>
//                               </FormItem>
//                             </FormField>
//                             <FormField>
//                               <FormItem>
//                                 <FormLabel>Age</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     {...register('age')}
//                                     placeholder="Age"
//                                     defaultValue={editingStudent.age}
//                                     required
//                                   />
//                                 </FormControl>
//                               </FormItem>
//                             </FormField>
//                             <FormField>
//                               <FormItem>
//                                 <FormLabel>Email</FormLabel>
//                                 <FormControl>
//                                   <select
//                                     {...register('email')}
//                                     defaultValue={editingStudent.email}
//                                     className="w-full p-2 border border-gray-300 rounded"
//                                   >
//                                     <option value="m@example.com">m@example.com</option>
//                                     <option value="m@google.com">m@google.com</option>
//                                     <option value="m@support.com">m@support.com</option>
//                                   </select>
//                                 </FormControl>
//                                 <FormDescription>Select a predefined email for the student.</FormDescription>
//                               </FormItem>
//                             </FormField>
//                             <Button type="submit">Save</Button>
//                             <Button onClick={() => setEditingStudent(null)}>Cancel</Button>
//                           </Form>
//                         </div>
//                       )}
//                     </PopoverContent>
//                   </Popover>
//                   {/* Use a button with an image for deleting */}
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <button className="ml-5" onClick={() => confirmDelete(student)}>
//                         <img src="del.png" alt="Delete" />
//                       </button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This action will remove the student from the list.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel onClick={() => setStudentToDelete(null)}>Cancel</AlertDialogCancel>
//                         <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default StudentTable;
