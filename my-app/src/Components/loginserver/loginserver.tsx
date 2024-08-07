import React from "react";
import LoginPage from "../login/loginClient/createLogin";

interface Props {
    params: any;
}

const Loginserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
          <LoginPage/>
        </>
    );
};

export default Loginserver;
