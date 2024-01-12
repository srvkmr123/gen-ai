
import React,{useRef} from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import XHR from '@uppy/xhr-upload';
import './FilesUpload.scss'

 const FileUpload = ({setIsUploadSuccess}) => {

  const dashboardRef = useRef(null);

  const uppy = React.useMemo(() => {
    return new Uppy({
    debug:true,
      restrictions: { maxNumberOfFiles: 25 },
      autoProceed: false,
      
    })
    .use(XHR, { endpoint: "http://localhost:8000/genai/ingestion"})
    .on('complete',result=>{
      result.successful.forEach((file) => {
        const responseData = file.response;
        console.log('Response data for file', file.id, responseData);
        localStorage.setItem("success",true);
        setIsUploadSuccess(true)
      });
    })
  }, []);
  
	return <Dashboard ref={dashboardRef} className='uppy-dashboard'  uppy={uppy}  width='220px' height='250px' proudlyDisplayPoweredByUppy={false} />
   
};
export default FileUpload 