import React from "react";
import HospitalForm from "../hospitalform/form";

interface Props {
    params: any;
}

const Hospitalserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
        <HospitalForm/>
        </>
    );
};

export default Hospitalserver;
