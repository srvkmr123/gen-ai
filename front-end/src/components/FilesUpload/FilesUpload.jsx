import {useState} from 'react'
import './FilesUpload.scss'

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

    const renderFileList = () => (<ol>
        {[...files].map((f, i) => (
            <li key={i}>{f.name.substring(0,10)} - {f.type}</li>
        ))}
    </ol>)

    // const renderButtonStatus = () => (
    //     (status === STATUS_IDLE) ? 
    //         'Send to server' : 
    //         <img src = "./load.svg" />
    // )

    return (<div>
        <input
            type="file"
            accept="*" 
            multiple
            className='choose-file'
            onChange={(e)=> setFiles(e.target.files)} />
        {renderFileList()}
        <button id='file-upload-btn' onClick={handleUploadClick}>
           Upload
        </button>
    </div>)
}

export default FilesUpload