import React from "react";
import ProductsPage from "../productclient/productcreate";

interface Props {
    params: any;
}

const Productserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
          <ProductsPage/>
        </>
    );
};

export default Productserver;
