import { useEffect, useState } from "react"
import FileInput from "../components/FileInput"
import { themeColor } from "../common/constants"
import { NavLink } from "react-router"
import * as pdfjsLib from "pdfjs-dist"
import workersrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"

pdfjsLib.GlobalWorkerOptions.workerSrc = workersrc;

const PdfToImage = ()=>{
    const [files,setFiles] = useState([])
    const [response,setResponse] = useState({message:"",status:"",outPut:[]})
    const [pdfUrl,setPdfUrl] = useState("")
    useEffect(()=>{
      if(files.length!=0){
        const url = URL.createObjectURL(files[0]);
        setPdfUrl(url)
      }
    },[files])

    const handleConversion = async(e)=>{
        e.preventDefault();
        setResponse({
            status:"loading",
            message:"we are converting into images | 0% completed",
            outPut:""
        })
        try{
        if(files.length == 0){
            throw("no pdf file to convert into images")
        }
        const file = files[0];
        const fileData = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
            data:fileData
        }).promise;

        const images = [];

        for(let i = 1;i<=pdf.numPages;i++){
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({scale:2});

            const canvas = document.createElement("canvas")
            const context = canvas.getContext("2d")

            canvas.width = viewport.width;
            canvas.height = viewport.width;

            const renderTask =  page.render({
                canvasContext:context,
                viewport:viewport
            })

            await renderTask.promise;

            const blob = await new Promise((resolve, reject) => {
                canvas.toBlob(
                    (result)=> result ? resolve(result) : reject(new error("image conversion failed")),
                    "image/jpg"
                )
            })

            const imageUrl = URL.createObjectURL(blob)

            images.push({
                name:`image-${i}`,
                url:imageUrl
            })

            setResponse({
            status:"loading",
            message:`we are converting into images | ${Math.ceil((i/pdf.numPages)*100)}% completed`,
            outPut:""
        })


        }

        setResponse({message:"pdf successfully converted into images",status:"success",outPut:images})

        }catch(e){
            setResponse({message:`${e}`,status:"failed",outPut:""})
        }
    }

     const handleDownload = async()=>{
        const element = document.createElement("a");
        for (let image of response.outPut){
            element.href = image.url;
            element.download = image.name;
            await element.click();
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
                {response.status=="success"&&<button onClick={handleDownload} className="cursor-pointer bg-green-500 text-white p-1 font-semibold border border-zinc-400 rounded-lg shadow-sm">Download Images</button>}
                {response.status!=""&&<p><span>{response.status}:</span> <span className={`${response.status == "success"?"text-green-500":response.status=="failed"?"text-red-500":""}`}>{response.message}</span></p>}
            </div>
               {pdfUrl!=""&&<iframe className="overflow-auto w-full h-full mt-1 w-[100%] lg:w-[50%]" src={pdfUrl} frameborder="0"></iframe>}
            </div>
            )
        }
        </div>
    )
}

export default PdfToImage;