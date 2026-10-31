import { useState } from "react";
import FileInput from "../components/FileInput";

const ImageToPdf = () =>{
    const [files,setFiles]= useState([])
    return(
      <div>
        {
          (files == null || files.length == 0 )?( <FileInput allowedFileTypes={["image/jpeg", "image/png"]} setFiles={setFiles} multiple = {true}/>)
          :(
            <div>files selected</div>
          )
        }
      </div>
    )
}

export default ImageToPdf;