"use client";
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getAllHospitals, softDeleteHospital, updateHospital } from '@/lib/hospitalActions';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Hospital {
  _id: string;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  contact: string;
  problem: string;
  address: string;
}

const HospitalManagement: React.FC = () => {
  const { register, handleSubmit, reset, setValue } = useForm<Hospital>();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Hospital | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await getAllHospitals();
      if (response.success && response.data) {
        const typedHospitals: Hospital[] = response.data.map((hospital: any) => ({
          ...hospital,
          _id: String(hospital._id),
        }));
        setHospitals(typedHospitals);
      } else {
        console.error(response.error);
      }
    };

    fetchHospitals();
  }, []);

  const onSubmit: SubmitHandler<Hospital> = async (data) => {
    if (editingHospital) {
      const response = await updateHospital(editingHospital._id, data);
      if (response.success && response.data) {
        const updatedHospital = { ...response.data, _id: editingHospital._id } as Hospital;
        setHospitals((prevHospitals) =>
          prevHospitals.map((hospital) =>
            hospital._id === editingHospital._id ? updatedHospital : hospital
          )
        );
        setEditingHospital(null);
        reset();
        setSuccessMessage("Hospital updated successfully!");
        
      } else {
        console.error(response.error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const response = await softDeleteHospital(id);
    if (response.success) {
      setHospitals((prevHospitals) =>
        prevHospitals.filter((hospital) => hospital._id !== id)
      );
      setSuccessMessage("Hospital deleted successfully!");
    } else {
      console.error(response.error);
    }
  };

  const openEditPopover = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setValue('name', hospital.name);
    setValue('age', hospital.age);
    setValue('gender', hospital.gender);
    setValue('height', hospital.height);
    setValue('weight', hospital.weight);
    setValue('contact', hospital.contact);
    setValue('problem', hospital.problem);
    setValue('address', hospital.address);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: keyof Hospital) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedHospitals = hospitals
    .filter((hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.problem.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  return (
    <div className="p-6 h-100vh bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Hospital Management</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="mb-6">
        {editingHospital && (
          <Popover as="div" className="relative">
            <Popover.Button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Edit Hospital
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel className="absolute z-10 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {['name', 'age', 'gender', 'height', 'weight', 'contact', 'problem', 'address'].map((field) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                        {field}
                      </label>
                      <input
                        id={field}
                        type={field === 'age' || field === 'height' || field === 'weight' ? 'number' : 'text'}
                        {...register(field as keyof Hospital, { required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update Hospital
                    </Button>
                  </div>
                </form>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, contact, or problem"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Hospital List</h2>
        <div className="overflow-auto h-[500px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Age', 'Gender', 'Height', 'Weight', 'Contact', 'Problem', 'Address', 'Actions'].map((header, idx) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase() as keyof Hospital)}
                  >
                    {header}
                    {sortField === header.toLowerCase() && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedHospitals.map((hospital) => (
                <tr key={hospital._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hospital.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.height}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.problem}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <PencilIcon
                      className="h-5 w-5 text-blue-500 inline-block cursor-pointer"
                      onClick={() => openEditPopover(hospital)}
                    />
                    <TrashIcon
                      className="h-5 w-5 text-red-500 inline-block cursor-pointer ml-4"
                      onClick={() => handleDelete(hospital._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalManagement;
