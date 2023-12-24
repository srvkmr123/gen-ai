
import React from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import XHR from '@uppy/xhr-upload';
import './FilesUpload.scss'

 const FileUpload = () => {
  const uppy = React.useMemo(() => {
    return new Uppy({
    debug:true,
      restrictions: { maxNumberOfFiles: 25 },
      autoProceed: false,
      
    }).use(XHR, { endpoint: "https://httpbin.org/post"})
  }, []);
	return <Dashboard className='uppy-dashboard' uppy={uppy} plugins={[]} width='250px' height='250px' proudlyDisplayPoweredByUppy={false} />
   
};
export default FileUpload 