
// import ProductsPage from '@/Components/productclient/productcreate';
// import Productserver from '@/Components/productserver/productserver';
// import React from 'react';

// interface Props {
//   params: any;
// }

// const Productserverside: React.FC<Props> = ({ params }) => {
    
//   return (
//     <>
//       <ProductsPage   />
//       <div className="mt-4">
//       </div>
//     </>
//   );
// };

// export default Productserverside;


// import React from "react";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// const Dashboard = async () => {
//   const session = await getServerSession();
//   if (!session) {
//     redirect("/");
//   }
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-between p-24">
//      <h1>Dashboard</h1>
//     </div>
//   );
// };

// export default Dashboard;

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function dashboard(){
    const session = await getServerSession();
    //   if (!session) {
    //     redirect("/");
    //   }
    return(
        <div>
            <h1>Hello Dashboard</h1>
        </div>
    )
}
export default dashboard;