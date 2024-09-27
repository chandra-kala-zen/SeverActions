'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function Chat(){
    const [input,setInput] = useState("");
    const [items, setItems] =  useState<string[]>([])
    const HandleButton = () => {
        if(input.trim() === '') {
            alert("enter the msg");
        }else{
            setItems([...items,input])
            setInput("")
        }
    }
   const  setTimeout = () =>{
    console.log(input,2000)
   }

    return(
        <div>
            <h1 className="text-center p-2"> ✨ ✨ Welcome to chatter box</h1>
            <div className="flex flex-col border-2 border-gray-300 h-screen">
                <h1>{input}</h1>
                <div>
                    {
                        items.map((name,index) => (
                            <li key={index} >{name}</li>
                        ))
                    }
                    <div className="text-mr" dir="rtl"> {
                        items.map((name,index) => (
                            <li key={index} >{name}</li>
                        ))
                    }</div>
                </div>
                <Input className="mt-auto" value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Enter message here....." />
                <Button  onClick={HandleButton}  type="submit" >Submit</Button>
            </div>


        </div>
    )
}
export default Chat;