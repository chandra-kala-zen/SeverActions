// 'use client'
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
// import Link from "next/link";
// function page(){
//     return(
//         <div className="shadow-custom-dark p-5 bg-blue-50  mt-3 gap-4 flex flex-col items-between rounded-[50px]  w-[500px] m-auto">
//             <div className="items-center text-center m-auto">
//                 <img src="ama.jpeg" alt="amazon" className="w-[50px] h-[50px] rounded-[50%] m-auto" />
//                 <h1 className="font-bold ">✨✨ Welcome to Amazon</h1>
//             </div>
//             <div className="flex  items-center gap-4 justify-center">
//                 <img src="user.svg" className="h-[20px] w-[20px]" alt="" />
//                 <Input type=" name" placeholder="Enter Name" className="flex-1"  />
//             </div>
//             <div className="flex  items-center gap-4 justify-center">
//                 <img src="email.png" className="h-[20px] w-[20px]"  alt="" />
//                 <Input type="email" placeholder="Enter Your Email" className="flex-1" />
//             </div>
//             <div className="flex  items-center gap-4 justify-center">
//                 <img src="lock.png" className="h-[20px] w-[20px]"  alt="" />
//                 <Input type="password" placeholder="Create Your Password" className="flex-1" />
//             </div>
//             <Button className="font-bold">Sign Up</Button>
//             <h1 className="text-right">Already have Account <Link className="text-blue-400" href="/login">Login</Link></h1>
//         </div>
//     )
// }
// export default page;



import React from 'react';
import Signupserver from '@/Components/signupComponets/signupserver';

interface Props {
  params: any;
}

const Studentdetailserver: React.FC<Props> = ({ params }) => {
    
  return (
    <>
      <Signupserver params={undefined} />
      <div className="mt-4">
      </div>
    </>
  );
};

export default Studentdetailserver;
