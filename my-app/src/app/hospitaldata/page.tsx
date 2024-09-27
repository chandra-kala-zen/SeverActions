// // import HospitalTable from "@/Components/hospitalform/getallHospitalData";
// // import Hospitalserver from "@/Components/hospitalserver/hospitalServer";

// import HospitalForm from "@/Components/hospitalform/form"

// // const page = async() => {
// //     return (
// //       <>
// //         <Hospitalserver params={undefined} />
// //         {/* <HospitalTable /> */}
// //       </>
// //     );
// //   };
  
// //   export default page;


// function Hospital(){
//     return(
//         <div>
//             <HospitalForm />
//         </div>
//     )
// }
// export default Hospital


"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Hospitalserver from "@/Components/hospitalserver/hospitalServer";  // Any server-side functionality

const Page = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      setIsAuthenticated(true);  
      // Set authentication state to true after login
    }
  }, [sessionStatus]);

  // If the session is loading, show a loading indicator
  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  // If the user is not authenticated, show the login prompt
  if (!isAuthenticated && sessionStatus === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl mb-4">Please Sign In to Access the Hospital Form</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => router.push("/login")} 
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <Hospitalserver params={undefined} />
   
    </>
  );
};

export default Page;



