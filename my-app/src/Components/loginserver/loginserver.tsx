import React from "react";
import CreateProductPage from "../login/loginClient/createLogin";

interface Props {
    params: any;
}

const Loginserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
          <CreateProductPage/>
        </>
    );
};

export default Loginserver;
