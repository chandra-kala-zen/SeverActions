
type data ={
    id:number;
    name: string;
    email:string;
}
async function page(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
    return(
        <div>
            {
                data.map((data:data)=>(
                    <div key={data.id}>
                        <h1>{data.name}</h1>
                        </div>
                ))
            };
        </div>
    )
}
export default page;








