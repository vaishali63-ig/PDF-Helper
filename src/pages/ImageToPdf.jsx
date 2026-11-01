import { useState } from "react";
import FileInput from "../components/FileInput";
import { NavLink } from "react-router";
import { themeColor } from "../common/constants";
import jsPDF from "jspdf";

const ImageToPdf = () =>{
    const [files,setFiles]= useState([])
    const [response,setResponse] = useState({message:"",status:"",output:""})

    const HandleConversion = async ()=>{
        setResponse({
            status:"loading",
            message:"we are processing images | 0% completed"
        })
       if(files.length==0){
        setResponse({message:"no images selected to create pdf",status:"failed",output:""})
        return;
       }
       try{
         const pdf = new jsPDF({
            orientation:"portrait",
            unit:"mm",
            format:"a4"
         })

         for (let i=0;i<files.length;i++){
            const file = files[i];
            const imageUrl = URL.createObjectURL(file)

            const image = new Image()
            image.src = imageUrl;

            await new Promise((resolve,reject)=>{
                image.onload = resolve
                image.onerror = reject
            })

            if (i>0) {
                pdf.addPage();
            }

            const pageWidth = 210
            const pageHeight =297
            const margin = 10

            const maxWidth = pageWidth - 2*margin
            const maxHeight = pageHeight - 2*margin

            const ratio = Math.min(
                maxWidth/image.width,
                maxHeight/image.height
            )

            const width = image.width * ratio;
            const height = image.height * ratio;

            const [x,y] = [(pageWidth-width)/2,(pageHeight-height)/2];
            pdf.addImage(image,file.type,x,y,width,height)

            URL.revokeObjectURL(imageUrl)

            setResponse({
            status:"loading",
            message:`we are processing images | ${Math.ceil(((i+1)/files.length)*100)}% completed`
        })

         }

         const outputUrl = URL.createObjectURL(pdf.output("blob"))

         setResponse({
            message:"converted to pdf successfully",
            status:"success",
            output:outputUrl
         })

       }catch(e){
        setResponse({message:`${e}`,status:"failed",output:""})
       }
    }

    return(
      <div className="h-[100%] pb-[5rem] bg-zinc-100 w-[100%]">
         <div className="p-2">
            <p className="text-lg font-semibold"><NavLink to="/">Home</NavLink> {">"} Image To Pdf Converter</p>
         </div>
        {
          (files == null || files.length == 0 )?( <FileInput title="Upload or Drag and Drop Images Here" allowedFileTypes={["image/jpeg", "image/png"]} setFiles={setFiles} multiple = {true}/>)
          :(
            <div className="flex flex-col items-center p-4">
            <div className="flex justify-start items-center gap-5 w-[100%] lg:w-[60%]">
                <button onClick={HandleConversion} style={{backgroundColor:themeColor}} className={`p-1 border border-zinc-400 rounded font-semibold text-white cursor-pointer`}>Convert To Pdf</button>
                {response.status=="success"&&<a href={response.output} download={"converted-pdf.pdf"} className="p-1 font-semibold text-white bg-green-500 rounded-sm border border-zinc-400 shadow-sm">Download Pdf</a>}
                {response.status!=""&&(
                    <p><span>{response.status}</span>{" "}<span className={`${response.status=="success"?"text-green-500":response.status=="failed"?"text-red-500":""}`}>{response.message}</span></p>
                )}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 border border-zinc-200 rounded-smm shadow-sm my-2 p-2 w-[100%] lg:w-[60%]">
                 {
                    files.map((f,i)=>{
                        return <div>
                                    <div className="flex gap-1 items-center">
                                    <button onClick={()=>{setFiles(files.filter((_,idx)=>i!=idx)); setResponse({message:"",status:"",output:""})} } className="cursor-pointer mb-1 bg-red-400 rounded-lg shadow-sm p-1 border border-zinc-200 text-white font-semibold">Delete Page</button>
                                    <p>Page No. {i+1}</p>
                                    </div>
                                    <img src={URL.createObjectURL(f)} alt={f.name||""} />
                                </div>
                    })
                 }
            </div>
            </div>
          )
        }
      </div>
    )
}

export default ImageToPdf;