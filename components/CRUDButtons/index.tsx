import { IoMdAddCircle } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";

export default function CRUDButtons(){
    return(
        <div className="flex flex-col gap-2 mt-20 mr-2">
            <button className="flex justify-center items-center text-2xl text-white w-16 h-16 rounded-md bg-[#28A9A1] hover:bg-[#3ec5bc]"> <IoMdAddCircle /> </button>
            <button className="flex justify-center items-center text-2xl text-[#137b74] w-16 h-16 rounded-md bg-[#6EF5ED] hover:bg-[#4ed7ce]"> <MdEdit /> </button>
            <button className="flex justify-center items-center text-2xl text-white w-16 h-16 rounded-md bg-[#FE3F3F] hover:bg-[#d02020]"> <MdDelete /> </button>
        </div>
    )
}