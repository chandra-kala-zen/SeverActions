import React from "react";
import CrudClient from "../crudCient/createCrud";

interface Props {
    params: any;
}

const Crudserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
        <CrudClient />
        </>
    );
};

export default Crudserver;
