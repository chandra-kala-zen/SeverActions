import React from "react";
import StudentNameForm from "../exClient/exclient";

interface Props {
    params: any;
}

const Exampleserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
          <StudentNameForm/>
        </>
    );
};

export default Exampleserver;
