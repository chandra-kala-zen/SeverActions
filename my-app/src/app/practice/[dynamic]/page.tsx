
import React from "react"
function page({params}:{params : {dynamic : string}}){
    return(
        <div>
            <h1 className="text-center font-bold">GO to Next page current page <span className="text-red-500">{params.dynamic}</span></h1>
        </div>
    )
}
export default page;