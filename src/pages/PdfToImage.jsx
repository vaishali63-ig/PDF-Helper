import { useState } from "react"
import FileInput from "../components/FileInput"
import { themeColor } from "../common/constants"
import { NavLink } from "react-router"

const PdfToImage = ()=>{
    const [files,setFiles] = useState([])
    const [response,setResponse] = useState({message:"",status:"",outPut:""})

    const handleConversion = async(e)=>{
        e.preventDefault();
        setResponse({
            status:"loading",
            message:"we are converting into images | 0% completed",
            outPut:""
        })
        try{

        }catch(e){
            setResponse({message:`${e}`,status:"failed",outPut:""})
        }
    }
    return(
        <div className="w-[100%] h-[90vh] bg-zinc-100">
            <div className="p-2 w-full">
                <p className="text-lg  font-semibold"><NavLink to="/">Home</NavLink>{">"} PDF To JPG Converter</p>
            </div>
        {
            (files==null || files.length==0)?(
                <FileInput title="Upload or Drag and Drop Pdf File Here" allowedFileTypes={["application/pdf"]} setFiles={setFiles}/>
            ):(
            <div className="h-[100%] w-[100%] mt-4 p-2 flex flex-col items-center">
            <div className="flex justify-start gap-4 items-center w-[100%] lg:w-[50%]">
                <button onClick={handleConversion} style={{backgroundColor:themeColor}} className="cursor-pointer p-1 border border-zinc-400 rounded-lg shadow-sm text-white font-semibold">Convert Into Images</button>
                {response.status=="success"&&<button className="bg-green-500 text-white font-semibold border border-zinc-400 rounded-lg shadow-sm">Download Images</button>}
                {response.status!=""&&<p><span>{response.status}:</span> <span className={`${response.status == "success"?"text-green-500":response.status=="failed"?"text-red-500":""}`}>{response.message}</span></p>}
            </div>
                <iframe className="overflow-auto w-full h-full mt-1 w-[100%] lg:w-[50%]" src={URL.createObjectURL(files[0])} frameborder="0"></iframe>
            </div>
            )
        }
        </div>
    )
}

export default PdfToImage;