import {useState} from 'react'
import './FilesUpload.scss'
import { IoMdAttach } from "react-icons/io";


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

    const renderFileList = () => (<ol className='files-ol'>
        {[...files].map((f, i) => (
            <li className='files-list' key={i}>{f.name.substring(0,10)} - {f.type}</li>
        ))}
    </ol>)

    // const renderButtonStatus = () => (
    //     (status === STATUS_IDLE) ? 
    //         'Send to server' : 
    //         <img src = "./load.svg" />
    // )

    return (<div>

        {/* for multiple files upload */}
        <input
            type="file"
            accept="*" 
            multiple
            className='choose-file'
            onChange={(e)=> setFiles(e.target.files)} />
        {renderFileList()}

        {/* for folder upload only */}
        <label htmlFor="choose-folder" className='select-folder'>Choose folder <IoMdAttach size={20}/></label>
        <input  id='choose-folder' webkitdirectory="" type="file" hidden />
        <button className='file-upload-btn' onClick={handleUploadClick}>
        <i className="fa-solid fa-arrow-up-from-bracket"></i> Upload 
        </button>
    </div>)
}

export default FilesUpload