'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function Todo(){
  const [title,setTitle] = useState("");
  const [items,setItems] = useState<string[]>([])
  const [input,setInput] = useState("")                                                     // input fields for both title,items
// title and items
  const handleChange = () => {
    if(!title){                                                                             // title has not set
      if(input.length === 0 ){
        alert("Please entire title")
      }else{
        setTitle(input);
        setInput("");
      }
    }else{
      if(input.trim() === ''){
        alert(" Please enter items here")
      }else{
        setItems([...items,input])
        setInput('')
      }
    }
  };

  // toggle ...
  const [selectedItems,setSelectedItems] = useState<Set<number>>(new Set())
  const handleToggle = (i : number) =>{
    const newSelection  =  new Set(selectedItems)
    if(newSelection.has(i)){                                                                  //has() is a method of a Set that returns true
      newSelection.delete(i);
    }else{
      newSelection.add(i)
    }
    setSelectedItems(newSelection)
  }

 // deleting function ... 
  const deleteFun =() => {
    const Afterfilter = items.filter((_,index ) => !selectedItems.has(index))
    setItems(Afterfilter); 
    setSelectedItems(new Set())

  }
  return(
    <div className="w-[50%] m-auto">
        <h1 className="font-bold text-blue-600">To Do Application</h1>
        <div className="flex flex-row gap-4">
            <Input 
              type="text" 
              value={input} 
              onChange={(e)=> setInput(e.target.value)}  
              placeholder= {title ? "Enter items here" : "Enter title here"} 
            />
            <Button 
              onClick={handleChange}>
              {title ? "Add items" : " Set Title "} 
            </Button>
            <Button 
              onClick={deleteFun}>
              Delete
            </Button>
        </div>
        <div className="bg-gray-400 mt-3 rounded-[10px] ">
            {title && <h2 className="text-red-800 font-bold p-2">Title : {title}</h2>}
              {items.length === 0 ?(
                <p className="p-2">Not added yet</p>
              ):(
              <ul className="bg-orage-400">
                {
                  items.map((item,index) => (
                    <li className="p-2 gap-4" key={index}>
                      <input 
                        type="checkbox" 
                        checked = {selectedItems.has(index) } 
                        onChange={()=> handleToggle(index)} 
                      />
                      {item}</li>           
                  ))
                } 
              </ul>
              )}
        </div>
    </div>
  )
}
export default Todo;