import { useState } from "react";
import { themeColor } from "../common/constants";

const FileInput = ({multiple=false,setFiles,allowedFileTypes, title ="Upload or Drag and Drop File Here"})=>{
    const [response,setResponse] = useState({message:"",status:""})
    const handleFile = (files)=>{
        files = Array.from(files)  
        if (!multiple && files.length > 1){
           setResponse({message:"multipal files are not allowed",status:"failed"});
           return;
        } 
        if (files.filter(f=>!allowedFileTypes.includes(f.type)).length !=0){
            setResponse({message:`only ${allowedFileTypes.map(t=>t.split("/").pop()).join(", ")} file types are allowed`,status:"failed"});
           return;
        }
        setFiles(files)  
    }
    return (
        <div className="h-[100vh] flex flex-col justify-start mt-[5rem] items-center">
             <p className="text-xl font-semibold mb-4">{title}</p>
             <div onDragOver={(e)=>{e.preventDefault()}} onDrop={(e)=>{e.preventDefault(); handleFile(e.dataTransfer.files)}} className={`bg-white flex items-center justify-center w-[50%] h-[10rem] rounded-lg shadow-lg border border-[${themeColor}]`}>
                <label className={`border border-zinc-200 p-2 px-4 rounded-lg shadow text-lg font-semibold text-center cursor-pointer`} style={{backgroundColor:themeColor}} htmlFor="file">Choose File</label>
                 <input onChange={(e)=>{e.preventDefault(); handleFile(e.target.files)}} id="file" className="hidden" type="file" multiple={multiple} accept="image/jpeg image/png"/>
             </div>
             {response.status=="failed"&&(
                <p className="text-red-500 mt-2">{response.message}</p>
             )}
        </div>
    )
}
export default FileInput;