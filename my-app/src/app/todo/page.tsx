'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
   
function todo(){
    const [list,setList] = useState<string>("");
    const eventHandler = (e :ChangeEvent<HTMLInputElement>) =>{
        setList(e.target.value);
    };

    const [submitData,setSubitData] = useState<string[]>([]);
    const submitDataFun = (e : FormEvent) =>{
        e.preventDefault();

        if(list.trim()){
            setSubitData([...submitData,list]);
            setList("")
            console.log(submitData)

        }
    };
    const [cancel,setCancel] = useState<string>("");
    const cancelList = () =>{
        setCancel("this was canceled");
        setList("");
    }

    return(
        <div className="w-[500px] m-auto">
            <form className="w-[500px] flex border-2 m-auto p-4 gap-3" onClick={submitDataFun}>
                <Input type="text" value={list} onChange={eventHandler} placeholder="Enter any list here" />
                <Button type="submit">Submit</Button>
                <Button onClick={cancelList} >Cancel</Button>

            </form>
            {cancel  && <p className="text-red-500 font-bold">{cancel}</p>}

            <div className="font-bold">
                {submitData.map((entry,index)=> (
                    <p key={index} >{entry}</p>
                ))}
            </div>
        </div>
    )
}
export default todo;