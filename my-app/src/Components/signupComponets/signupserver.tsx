import React from "react";
import Page from "../signupClient/createSignup";

interface Props {
    params: any;
}

const Signupserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
          <Page/>
        </>
    );
};

export default Signupserver;
