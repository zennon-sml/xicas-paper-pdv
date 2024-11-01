export default function CRUDButtons(){
    return(
        <div className="flex flex-col gap-2 mt-20 mr-2">
            <button className=" w-16 h-16 rounded-md bg-lime-500">ADD</button>
            <button className=" w-16 h-16 rounded-md bg-yellow-500">EDIT</button>
            <button className=" w-16 h-16 rounded-md bg-red-500">DELETE</button>
        </div>
    )
}