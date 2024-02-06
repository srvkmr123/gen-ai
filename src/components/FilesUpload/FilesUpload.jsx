
// import React,{useRef} from 'react';
// import Uppy from '@uppy/core';
// import { Dashboard } from '@uppy/react';
// import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';
// import XHR from '@uppy/xhr-upload';
// import './FilesUpload.scss'

//  const FileUpload = ({setIsUploadSuccess}) => {

//   const dashboardRef = useRef(null);

//   const uppy = React.useMemo(() => {
//     return new Uppy({
//     debug:true,
//       restrictions: { maxNumberOfFiles: 25 },
//       autoProceed: false,

//     })
//     .use(XHR, { endpoint: "http://localhost:8000/genai/ingestion"})
//     .on('complete',result=>{
//       result.successful.forEach((file) => {
//         const responseData = file.response;
//         console.log('Response data for file', file.id, responseData);
//         localStorage.setItem("success",true);
//         setIsUploadSuccess(true)
//       });
//     })
//   }, []);

// 	return <Dashboard ref={dashboardRef} className='uppy-dashboard'  uppy={uppy}  width='220px' height='250px' proudlyDisplayPoweredByUppy={false} />

// };
// export default FileUpload 



import React, { useState } from 'react';
import shortid from "https://cdn.skypack.dev/shortid@2.2.16";
import axios from 'axios'
import './FilesUpload.css'
import './FilesUpload.scss'
import DeleteConfirmation from './DeleteDailog';



const FileUpload = ({ setIsUploadSuccess }) => {
  const [selectedfile, SetSelectedFile] = useState([]);
  const [Files, SetFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const onFileChange = (event) => {
    console.log(event.target.files);
    const files = event.target.files;
    const filesArray = Array.from(files);
    SetSelectedFile(filesArray);
  };



  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const InputChange = (e) => {
    // --For Multiple File Input
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push((e.target.files[i]));
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        SetSelectedFile((preValue) => {
          return [
            ...preValue,
            {
              id: shortid.generate(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileimage: reader.result,
              datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
              filesize: filesizes(e.target.files[i].size)
            }
          ]
        });
      }
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  }


  const DeleteSelectFile = (id) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      const result = selectedfile.filter((data) => data.id !== id);
      SetSelectedFile(result);
    } else {
      // alert('No');
    }

  }

  const FileUploadSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData()
    setIsUploading(true);
    // form reset on submit 
    e.target.reset();
    // if (selectedfile.length > 0) {
    // for (let index = 0; index < selectedfile.length; index++) {
    //   SetFiles((preValue) => {
    //     return [
    //       ...preValue,
    //       selectedfile[index]
    //     ]
    //   })
    // }
    selectedfile.forEach((file, i) => {
      console.log(file, "okayyyy");
      data.append('file', file)
    })
    axios.post('http://localhost:8000/genai/ingestion', data
    )
      .then(function (response) {
        console.log(response);
        setIsUploadSuccess(true)
        SetSelectedFile([]);
        setIsUploading(false);
      })
      .catch(function (error) {
        console.log(error);
      })

    // } else {
    //   alert('Please select file')
    // }
  }
  const DeleteFile = (name,id) => {
    console.log(name,id);
    selectedfile.forEach((data,id)=>{
      console.log(name,"   ",data.name);
      if(name === data.name){
        const result = selectedfile.filter((data) => data.name !== name);
        SetSelectedFile(result);
      }else{
        console.log("Logic is wrong");
      }
    })
   
    //   SetFiles(result);
    // if (window.confirm("Are you sure you want to delete this Image?")) {
    //   const result = Files.filter((data) => data.id !== id);
    //   SetFiles(result);
    // } else {
    //   // alert('No');
    // }
  }
  // const showDeleteModal = (type, id) => {

  //   setFruitMessage(null);
  //   setVegetableMessage(null);

  //   if (type === "fruit") {
  //     setDeleteMessage("re you sure you want to delete the fruit ");
  //   } else if (type === "vegetable") {
  //     setDeleteMessage("Are you sure you want to delete the vegetable ");
  //   }

  //   setDisplayConfirmationModal(true);
  // };

  // // Hide the modal
  // const hideConfirmationModal = () => {
  //   setDisplayConfirmationModal(false);
  // };

  // // Handle the actual deletion of the item
  // const submitDelete = (type, id) => {
  //   if (type === "fruit") {
  //     setFruitMessage(`The fruit was deleted successfully.`);
  //     setFruits(fruits.filter((fruit) => fruit.id !== id));
  //   } else if (type === "vegetable") {
  //     setVegetableMessage(`The vegetable was deleted successfully.`);
  //     // setVegetables(vegetables.filter((vegetable) => vegetable.id !== id));
  //   }
  //   setDisplayConfirmationModal(false);
  // };


  return (

    <div className="fileupload-view">


      <div className="kb-modal-data-title">
        <div className="kb-data-title">
          <h6 style={{ color: "white" }}>Upload File </h6>
        </div>
      </div>
      <div className='form-div'>
        <form onSubmit={FileUploadSubmit}>


          <div className='files-section' style={{ overflowY: "auto", height: "25vh" }} >
            <label htmlFor="file-upload" className="custom-file-upload">
              <i class="fa fa-cloud-upload"></i> Drop the files here or browse the file
            </label>
            <input className='file-input' id="file-upload" type='file' multiple onChange={onFileChange} />
            {selectedfile.map((data, index) => {
              console.log(data.name);
              return (
                <div >
                  <div className="file-display" key="index">
                    <div> <i class="fa-sharp fa-regular fa-file"></i>&nbsp;<span style={{ wordBreak: "break-word" }}>{data.name}</span></div>
                    <div style={{ marginLeft: "3px" }}> <i className="fa-solid fa-xmark" onClick={() => DeleteFile(data.name,index)}></i></div></div>
                </div>
              )
            })}
          </div>
          {!isUploading ? <button className="button" type="submit">Upload</button> : <p className='text'>Please wait...</p>}

        </form>

      </div>
      {/* <form onSubmit={FileUploadSubmit}>
                  <div className="kb-file-upload">
                    <div className="file-upload-box">
                      <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                      <span>Drag and drop or <span className="file-link">Choose your files</span></span>
                    </div>
                  </div>
                  <div className="kb-attach-box mb-3">
                    {
                      selectedfile.map((data, index) => {
                        const { id, filename, filetype, fileimage, datetime, filesize } = data;
                        return (
                          <div className="file-atc-box" key={id}>
                            {
                              filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                            }
                            <div className="file-detail">
                              <h6>{filename}</h6>
                              <p></p>
                              <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p>
                              <div className="file-actions">
                                <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="kb-buttons-box">
                    <button type="submit" className="btn btn-primary form-submit">Upload</button>
                  </div>
                </form> */}
      {/* {Files.length > 0 ?
                  <div className="kb-attach-box">
                    <hr />
                    {
                      Files.map((data, index) => {
                        const { id, filename, filetype, fileimage, datetime, filesize } = data;
                        return (
                          <div className="file-atc-box" key={index}>
                            {
                              filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                            }
                            <div className="file-detail">
                              <h6>{filename}</h6>
                              <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                              <div className="file-actions">
                                <button className="file-action-btn" onClick={() => DeleteFile(id)}>Delete</button>
                                <a href={fileimage} className="file-action-btn" download={filename}>Download</a>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  : ''} */}
      {/* <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type="fruit" id="1" message={deleteMessage}  /> */}
    </div>



  );
}

export default FileUpload 
