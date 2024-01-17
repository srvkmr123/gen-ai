import React, { useEffect, useState } from 'react'
import Aside from '../Aside/Aside'
import './PromptPageAPIExtraction.scss';
import paperPlane from '../../assets/paper-plane.png';
import axios from 'axios';

import { SpinnerDotted } from 'spinners-react';

function PromptPageAPIExtraction() {

  const [loading, setLoading] = useState(true)
  const [text, setText] = useState("")
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

  }

  useEffect(() => {

    axios.get('http://localhost:8000/genai/ruleextract')
      .then((response) => {
        console.log(response);
        setText(response.data);
        setLoading(false);
        //setLoading(false)
      })

  }, [])




  const handleInput = (e) => {
    setPromptInput(e.target.value);
  }
  const [promptInput, setPromptInput] = useState("");
  const [historyArr, setHistoryArr] = useState([]);


  return (
    <div className='main'>

      <div className="right-container">
        {/* <div className='chat-area' >
          {historyArr.map((data, index) => {
            if (data.author === "user") {
              return (
                <div>
                  <p className='user-data'>{data.content}</p>
                </div>
              )
            }
          })}
        </div> */}
        {loading ?
          <div style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", display: `${loading ? "flex" : "none"}` }}>
            <p>Please wait, this action may take a few seconds</p>
            <div style={{ textAlign: "center" }} >

              <SpinnerDotted enabled={loading} color='#0060a2' />

            </div> </div> :
          <div className='chat-area'>{text}</div>}
        {/* <div className='prompt-input-div'>
          <form onSubmit={handleChat}>
            <input type="text" className='prompt-input' onChange={(e) => handleInput(e)} placeholder='Enter your Message'
              name="promptInput" value={promptInput}></input>
            <img className="icon" onClick={handleChat} src={paperPlane}  ></img>
          </form>
        </div> */}
      </div>
    </div>
  )
}

export default PromptPageAPIExtraction
