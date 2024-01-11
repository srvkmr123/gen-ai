import React, { useEffect, useState } from 'react'
import './PromptPageAPIDiscover.scss';
import paperPlane from '../../assets/paper-plane.png';

function PromptPage() {

  const handleChat = (e) => {
    e.preventDefault();
    
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
  const [promptInput, setPromptInput] = useState("");
  const [historyArr, setHistoryArr] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("success") === true){
      handleChat();
    }
  
    
  }, [])
  

  return (
    <div className='main'>

      <div className="right-container">
        <div className='chat-area' >
          {historyArr.map((data, index) => {
            if (data.author === "user") {
              return (
                  <div className='user-data'>
                  <p className='user-data' >{data.content}
                  </p>
                  </div>
                  
              )
            }
            else if(data.author === "bot"){
              return(
                <div className='user-left-div'>
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
