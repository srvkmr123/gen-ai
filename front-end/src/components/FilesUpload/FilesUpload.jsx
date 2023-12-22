import {useState} from 'react'
import './FilesUpload.scss'
import { IoMdAttach } from "react-icons/io";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

function FilesUpload() {
    const [files, setFiles] = useState([])
    

    const uploadFiles = (data)=> {
       data.forEach(d=>console.log(d))
    }

    const packFiles = (files)=> {
        const data = new FormData();

        [...files].forEach((file, i) => {
            data.append(`file-${i}`, file, file.name)
        })
        return data
    }

    const handleUploadClick = () => {
        if (files.length) {
            const data = packFiles(files)
            uploadFiles(data)
        }
    }

    

    // const renderButtonStatus = () => (
    //     (status === STATUS_IDLE) ? 
    //         'Send to server' : 
    //         <img src = "./load.svg" />
    // )

    return (<div>

        {/* for multiple files upload */}
        <FilePond
        className='file-upload'
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={10}
                allowDrop
                webkitdirectory
                instantUpload={false}
                server="https://httpbin.org/post"
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />

        {/* for folder upload only */}
        {/* <label htmlFor="choose-folder" className='select-folder'>Choose folder <IoMdAttach size={20}/></label>
        <input  id='choose-folder' webkitdirectory="" type="file" hidden />
        <button className='file-upload-btn' onClick={handleUploadClick}>
        <i className="fa-solid fa-arrow-up-from-bracket"></i> Upload 
        </button> */}
    </div>)
}

export default FilesUpload