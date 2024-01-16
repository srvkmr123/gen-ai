/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './PromptPageAPIDiscover.scss';
import paperPlane from '../../assets/paper-plane.png';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';

function PromptPage({ isUploadSuccess, setIsUploadSuccess }) {
  const [intro, setIntro] = useState('Type Something...')
  const [loading, setLoading] = useState(false)
  const [promptInput, setPromptInput] = useState("");
  const [historyArr, setHistoryArr] = useState([]);

  const promptApiCall = (input) => {
    setLoading(true)
    axios.post('http://localhost:8000/genai/prompt', { prompt: input })
      .then(res => {
        axios.get('http://localhost:8000/genai/discover')
          .then((response) => {
            console.log(response);
            setHistoryArr((prevState) => {
              return [
                ...prevState,
                {
                  author: "bot",
                  content: response.data
                }
              ];
            });
            setLoading(false)
          })
      })
      .catch(err => console.log(err))

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
    if (localStorage.getItem("success") === true) {
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

  useEffect(() => setIntro('Type Something...'), [])


  const handleInput = (e) => {
    setPromptInput(e.target.value);
  }




  const showUploadMessage = () => {
    setTimeout(() => {
      setIsUploadSuccess(false)
    }, 2000)
    return (
      isUploadSuccess ? <div style={{ background: '#5cb85c', padding: '5px', color: 'white' }}>Files Uploaded Successfully !!</div> : null
    )
  }

  return (
    <div className='main'>

      <div className="right-container">

        {showUploadMessage()}
        <div className='chat-area' >



          {historyArr.map((data, index) => {
            if (data.author === "user") {
              return (
                <div className='user-data' key={index}>
                  <p className='user-right-div' > <strong>You: </strong> {data.content}
                  </p>
                </div>
              )
            }
            else if (data.author === "bot") {
              return (
                <div className='user-data' key={index}>
                  <p className='user-left-div' ><strong>Chatbot: </strong>{data.content}</p>
                </div>
              ) 
            }
          })}

          {/* {loading ? <div  className='user-data'><p className='user-left-div'><SpinnerDotted enabled={loading} color='#0060a2'/> Generating response...</p></div>:<div>{intro}</div>} */}
          {loading ? <div className='user-data'>
            <p className='user-left-div' ><span className='loader-span'> <strong>Chatbot: </strong>

              <SpinnerDotted enabled={loading} color='#0060a2' style={{marginLeft:"5px", marginRight:"5px"}} /> Generating response...</span></p>
          </div> :
            <div>{intro}</div>}

        </div>
        <div className='prompt-input-div'>
          <form onSubmit={handleChat}>
            <input type="text" className='prompt-input' onFocus={() => setIntro(null)} onChange={(e) => handleInput(e)} placeholder='Enter your Message'
              name="promptInput" value={promptInput}></input>
            <img className="icon" onClick={handleChat} src={paperPlane}  ></img>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PromptPage
