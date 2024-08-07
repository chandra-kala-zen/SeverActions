"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { getAllStudents, updateProfile, softDeleteProfile } from "@/lib/studentactions";

// Define the Student type with specific email types
type Student = {
  _id: string;
  studentname: string;
  initial: string;
  age: string;
  email: string;
};

// Define form values without the _id
type FormValues = Omit<Student, "_id">;

// Define validation schema using zod
const formSchema = z.object({
  studentname: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  initial: z.string().min(1, {
    message: "Initial must be at least 1 character.",
  }),
  age: z.string().min(1, {
    message: "Age must be at least 1 character.",
  }),
  email: z.string().min(1, {
    message: "Invalid email address",
  }),
});

const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  // Fetch all students
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      const result = await getAllStudents();
      setLoading(false);
      if (result.success && result.data) {
        console.log("Fetched students:", result.data);
        setStudents(result.data as Student[]);
      } else {
        setError(result.error || "Unknown error");
      }
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    if (editingStudent) {
      // Reset the form with student data excluding _id
      reset({
        studentname: editingStudent.studentname,
        initial: editingStudent.initial,
        age: editingStudent.age,
        email: editingStudent.email,
      });
    }
  }, [editingStudent, reset]);

  // Handle edit student
  const onEdit: SubmitHandler<FormValues> = async (data) => {
    if (editingStudent) {
      const response = await updateProfile(editingStudent._id, data);
      if (response.success && response.data) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === editingStudent._id ? response.data : student
          )
        );
        setEditingStudent(null);
        reset();
      } else {
        setError(response.error || "Unknown error");
      }
    }
  };

  // Handle delete confirmation
  const confirmDelete = (student: Student) => {
    setStudentToDelete(student);
  };

  // Handle soft delete
  const handleDelete = async () => {
    if (studentToDelete) {
      const response = await softDeleteProfile(studentToDelete._id);
      if (response.success) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentToDelete._id)
        );
        setStudentToDelete(null);
      } else {
        setError(response.error || "Unknown error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Student Management</h2>
      <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow font-semibold">
        <div>Name</div>
        <div>Initial</div>
        <div>Age</div>
        <div>Email</div>
        <div>Actions</div>
      </div>
      {students.map((student) => (
        <div
          key={student._id}
          className="grid grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow mb-4"
        >
          <div>{student.studentname}</div>
          <div>{student.initial}</div>
          <div>{student.age}</div>
          <div>{student.email}</div>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <button onClick={() => setEditingStudent(student)}>
                  <img src="edit.png" alt="Edit" />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                {editingStudent && editingStudent._id === student._id && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Edit Student</h3>
                    <Form {...form}>
                      <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="studentname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Student Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter student name"
                                  {...field}
                                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                                    errors.studentname
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                              </FormControl>
                              <FormMessage>{errors.studentname?.message}</FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="initial"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Initial</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter initial"
                                  {...field}
                                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                                    errors.initial
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                />
                              </FormControl>
                              <FormMessage>{errors.initial?.message}</FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter age"
                                  {...field}
                                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                                    errors.age ? "border-red-500" : "border-gray-300"
                                  }`}
                                />
                              </FormControl>
                              <FormMessage>{errors.age?.message}</FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                  }`}
                                >
                                  <option value="" disabled>
                                    Select an email
                                  </option>
                                  <option value="m@example.com">m@example.com</option>
                                  <option value="m@google.com">m@google.com</option>
                                  <option value="m@support.com">m@support.com</option>
                                </select>
                              </FormControl>
                              <FormMessage>{errors.email?.message}</FormMessage>
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Save</Button>
                        <Button onClick={() => setEditingStudent(null)}>Cancel</Button>
                      </form>
                    </Form>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="ml-3 h-[50px]" onClick={() => confirmDelete(student)}>
                  <img src="del.png" alt="Delete" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action is irreversible and the student will be deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setStudentToDelete(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentTable;
