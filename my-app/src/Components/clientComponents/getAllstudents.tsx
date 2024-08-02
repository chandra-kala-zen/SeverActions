'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Import Shadcn Table components
import { deleteProfile, getAllStudents, updateProfile } from '@/lib/studentactions';

// Define the Student type with specific email types
type Student = {
  _id: string;
  studentname: string;
  intial: string;
  age: string;
  email: string;
};

const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize React Hook Form
  const { register, handleSubmit, reset } = useForm<Student>();

  // Fetch all students
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      const result = await getAllStudents();
      setLoading(false);
      if (result.success && result.data) {
        setStudents(result.data as Student[]);
      } else {
        setError(result.error || 'Unknown error');
      }
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    if (editingStudent) {
      reset(editingStudent); 
    }
  }, [editingStudent, reset]);

  // Handle edit student
  const onEdit: SubmitHandler<Student> = async (data) => {
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
        setError(response.error || 'Unknown error');
      }
    }
  };

  // Handle delete student
  const handleDelete = async (studentId: string) => {
    const response = await deleteProfile(studentId);
    if (response.success) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
    } else {
      setError(response.error || 'Unknown error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto scroll-auto h-[300px] p-4">
      <h2 className="text-2xl font-semibold mb-4">Student Management</h2>
      <Table className="min-w-full bg-white border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-4 border-b">Name</TableHead>
            <TableHead className="py-2 px-4 border-b">Initial</TableHead>
            <TableHead className="py-2 px-4 border-b">Age</TableHead>
            <TableHead className="py-2 px-4 border-b">Email</TableHead>
            <TableHead className="py-2 px-4 border-b">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell className="py-2 px-4 border-b text-left">{student.studentname}</TableCell>
              <TableCell className="py-2 px-4 border-b">{student.intial}</TableCell>
              <TableCell className="py-2 px-4 border-b">{student.age}</TableCell>
              <TableCell className="py-2 px-4 border-b">{student.email}</TableCell>
              <TableCell className="py-2 px-4 border-b">
                <div className="text-red-500 bg-400-blue">
                  <Popover>
                    <PopoverTrigger asChild>
                      {/* Use a button with an image for editing */}
                      <button className="w-[15px]" onClick={() => setEditingStudent(student)}>
                        <img src="edit.png" alt="Edit" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      {editingStudent && editingStudent._id === student._id && (
                        <div className="mt-4">
                          <h3 className="text-xl font-semibold mb-2">Edit Student</h3>
                          <form onSubmit={handleSubmit(onEdit)} className="space-y-4">
                            <Input
                              {...register('studentname')}
                              placeholder="Name"
                              defaultValue={editingStudent.studentname} 
                              required
                            />
                            <Input
                              {...register('intial')}
                              placeholder="Initial"
                              defaultValue={editingStudent.intial} 
                              required
                            />
                            <Input
                              {...register('age')}
                              placeholder="Age"
                              defaultValue={editingStudent.age} 
                              required
                            />
                            <select
                              {...register('email')}
                              defaultValue={editingStudent.email} 
                              className="w-full p-2 border border-gray-300 rounded"
                            >
                              <option value="m@example.com">m@example.com</option>
                              <option value="m@google.com">m@google.com</option>
                              <option value="m@support.com">m@support.com</option>
                            </select>
                            <Button type="submit">Save</Button>
                            <Button onClick={() => setEditingStudent(null)}>Cancel</Button>
                          </form>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                  {/* Use a button with an image for deleting */}
                  <button className="ml-5" onClick={() => handleDelete(student._id)}>
                    <img src="del.png" alt="Delete" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
