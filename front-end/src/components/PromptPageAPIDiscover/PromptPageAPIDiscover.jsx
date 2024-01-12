/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './PromptPageAPIDiscover.scss';
import paperPlane from '../../assets/paper-plane.png';
import axios from 'axios';

function PromptPage({isUploadSuccess,setIsUploadSuccess}) {
  const [intro,setIntro]=useState('')
  const [loading,setLoading]=useState(false)
  const [promptInput, setPromptInput] = useState("");
  const [historyArr, setHistoryArr] = useState([]);

  const promptApiCall=(input)=>{
    axios.post('http://localhost:8000/genai/prompt',{prompt:input})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    
  }
  const handleChat = (e) => {
    e.preventDefault();
    promptApiCall(promptInput)
    console.log("inside", promptInput);

    setHistoryArr((prevState) => {
      return [
        ...prevState,
        {
          author: "user",
          content: promptInput
        }
      ];
    });
    setPromptInput("");
    if(localStorage.getItem("success") === true){
      setHistoryArr((prevState) => {
        return [
          ...prevState,
          {
            author: "bot",
            content: "You have successfully uploaded the documents."
          }
        ];
      });
    }

  }
  
  


  const handleInput = (e) => {
    setPromptInput(e.target.value);
  }
  

  useEffect(() => {
    setLoading(true)
    if(localStorage.getItem("success") === true){
      handleChat();
    }
   axios.get('http://localhost:8000/genai/discover')
   .then(res=>{
    setIntro(res.data)
    setLoading(false)
   })
   .catch(err=>console.log(err))
    
  }, [])
  //console.log(isUploadSuccess);
  const showUploadMessage=()=>{
    setTimeout(()=>{
      setIsUploadSuccess(false)
    },2000)
    return (
      isUploadSuccess?<div style={{background:'#5cb85c',padding:'5px',color:'white'}}>Files Uploaded Successfully !!</div>:null
    )
  }

  return (
    <div className='main'>

      <div className="right-container">
      
      {showUploadMessage()}
        <div className='chat-area' >
        {loading ? <div>Loading...</div>:<div>{intro}</div>}
          {historyArr.map((data, index) => {
            if (data.author === "user") {
              return (
                  <div className='user-data' key={index}>
                  <p className='user-data' >{data.content}
                  </p>
                  </div>
                  
              )
            }
            else if(data.author === "bot"){
              return(
                <div className='user-left-div' key={index}>
                  <p className='user-data' >{data.content}</p>
                  </div>
              )
            }
          })}
         
         
        </div>
        <div className='prompt-input-div'>
          <form onSubmit={handleChat}>
            <input type="text" className='prompt-input' onChange={(e) => handleInput(e)} placeholder='Enter your Message'
              name="promptInput" value={promptInput}></input>
            <img className="icon" onClick={handleChat} src={paperPlane}  ></img>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PromptPage
