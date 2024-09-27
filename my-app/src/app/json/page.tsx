'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { useState } from "react"

function Json(){

    const[input,setInput] = useState("");
    const[items,setItems] = useState<string[]>([]);
    const[age,setAge] = useState<number>(0);
    const router = useRouter();
    const handleButton = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form auto-refresh
        if(input.trim() === '' || age === 0){
            alert("Please fill field");
        }else{
            setItems((preitems) => [...preitems,`${input}(Age:${age})`]);
            setInput('') 
            setAge(0)
            router.push('/todo')
        } 
    }
    return(
        <div className="p-2">
            <form className="p-2 m-auto border-2 rounded-[5px] flex flex-col gap-3 w-[50%] ">
                <Input onChange={(e) => setInput(e.target.value)} value={input}
                type="text" placeholder="Type your name here" />
                <Input onChange={(e) => setAge(Number(e.target.value))}  
                type="number" placeholder="Enter your age" value={age || ''}/>
                <Button onClick={handleButton} type="submit" >Submit</Button>
            </form>
            <ul>
                    {
                        items.map((names,index) =>(
                            <li key={index}>{names}</li>
                          
                        ))
                    }
            </ul>
            
        </div>
    )
}
export default Json