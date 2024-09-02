
import React from 'react';
import Loginserver from '@/Components/loginserver/loginserver';

interface Props {
  params: any;
}

const Loginserverside: React.FC<Props> = ({ params }) => {
    
  return (
    <>
      <Loginserver params={undefined} />
      <div className="mt-4">
      </div>
    </>
  );
};

export default Loginserverside;
