
import React from 'react';
import { redirect } from 'next/navigation';
import StudentTable from '@/Components/clientComponents/getAllstudents';

interface Props {
  params: any;
}

const Studentdetailserver: React.FC<Props> = ({ params }) => {
    
  return (
    <>
      <StudentTable />
      <div className="mt-4">
      </div>
    </>
  );
};

export default Studentdetailserver;
