import React from "react";
import ProfileForm from "../clientComponents/studentclient";

interface Props {
    params: any;
}

const Studentdetailserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
          <ProfileForm/>
        </>
    );
};

export default Studentdetailserver;
