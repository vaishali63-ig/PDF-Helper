import { useEffect, useState } from "react";
import FileInput from "../components/FileInput";
import { NavLink } from "react-router";
import { MAX_PDF_MERGE_LIMIT, MIN_PDF_MERGE_LIMIT, themeColor } from "../common/constants";
import {PDFDocument} from 'pdf-lib'

const MergePdf = () =>{
    const [files,setFiles] = useState([])
    const [PdfUrls,setUrls] = useState([])
    const [selectedPdf,setSelectedPdf] = useState(0)
    const [response,setResponse] = useState({message:"",status:"",output:""})

    const HandleMerge = async()=>{
        setResponse({
            message: "Merging All Pdf... 0% Completed",
            status: "loading",
            output:""
        })
        try{
          if(files.length==0 || files.length<MIN_PDF_MERGE_LIMIT || files.length>MAX_PDF_MERGE_LIMIT){
            throw(`pdf file count must be within [${MIN_PDF_MERGE_LIMIT},${MAX_PDF_MERGE_LIMIT}]`)
          }
          const mergedPdf = await PDFDocument.create();

          for (let i=0;i<files.length;i++){
             
            const fileBytes = await files[i].arrayBuffer();

            const pdf = await PDFDocument.load(fileBytes)

            const indices = await pdf.getPageIndices()

            const coppiedPages = await mergedPdf.copyPages(
                pdf,
                indices
            )

            coppiedPages.forEach(page => {
                mergedPdf.addPage(page)
            });

            setResponse({
                message: `Merging All Pdf... ${Math.ceil(((i+1)/(files.length))/100)}% Completed`,
                status: "loading",
                output:""
            })
          }
          const pdfBytes = await mergedPdf.save();
          const blob = new Blob([pdfBytes],{
            type:"application/pdf"
          })
          const pdfUrl =  URL.createObjectURL(blob)
          setResponse({
            message:"PDF merged successfully",
            status:"success",
            output:pdfUrl
          })
        }catch(e){
               setResponse({
                message:`${e}`,
                status:"failed",
                output:""
               })
        }
    }
    useEffect(()=>{
        if(files.length!=0){
            setUrls(files.map((f)=>URL.createObjectURL(f)));
        }
        return ()=>{
           PdfUrls.map((url)=>URL.revokeObjectURL(url));
        } 
    },[files])
    return (
        <div className="w-[100%] h-[90vh] p-2">
            <div className="p-2">
                <p className="text-lg font-semibold "><NavLink to="/">Home</NavLink>{" > Merge PDF Files"}</p>
            </div>
            {
              (files==null || files.length==0)?<FileInput minLimit={MIN_PDF_MERGE_LIMIT} maxLimit={MAX_PDF_MERGE_LIMIT} setFiles={setFiles} multiple={true} title="Upload or Drag and Drop PDF Files Here" allowedFileTypes={["application/pdf"]}/>
              : <div className="w-[100%] h-[100%] flex flex-col gap-2 items-center justify-center">
                <div className="w-[100%] lg:w-[60%] flex px-2 gap-2 justify-start items-center">
                    {
                        files.map((_,idx)=>{
                            return(
                                <button key={idx} className={`cursor-pointer p-1 border border-zinc-400 rounded-lg shadow-lg font-semibold ${idx==selectedPdf?"":""}`} style={{backgroundColor:idx==selectedPdf?themeColor:""}} onClick={()=>setSelectedPdf(idx)}>PDF-{idx+1}</button>
                            )
                        })
                    }
                    <p className="border border-l"></p>
                    <button onClick={HandleMerge} style={{backgroundColor:themeColor}} className="p-1 border border-zinc-400 rounded-lg shadow-lg font-semibold text-white cursor-pointer">Merge All</button>
                    {response.status=="success"&&(
                        <a className="p-1 border border-zinc-400 rounded-lg shadow-lg text-white bg-green-500" href={response.output} download="merged-pdf.pdf">Download PDF</a>
                    )}
                    {response.status!=""&&(
                        <p className={`${response.status=="success"?"text-green-500":response.status=="failed"?"text-red-500":""}`}>{response.message}</p>
                    )}
                </div>
                {
                    PdfUrls.filter((_,idx)=>idx==selectedPdf).map((url)=>{
                        return <div className="w-[100%] h-[100%] lg:w-[60%] p-2">
                            <iframe className="w-[100%] h-[100%]" src={url} frameborder="0"></iframe>
                        </div>
                    })
                }
              </div>
            }
        </div>
    )
}

export default MergePdf;