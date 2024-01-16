import { Routes,Route } from 'react-router-dom'
import './App.scss'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import PromptPageAPIDiscover from './components/PromptPageAPIDiscover/PromptPageAPIDiscover'
import PromptPageAPIExtraction from './components/PromptPageAPIExtraction/PromptPageAPIExtraction'
import { useState } from 'react'
import Chatbot from './components/PromptPageAPIDiscover/Chatbot'

function App() {
  const [isUploadSuccess,setIsUploadSuccess]= useState(false)
  return (
    < div className='app'>
      <div>
        <Header/>
        </div>
        <div className="main-content">
          <Aside setIsUploadSuccess={setIsUploadSuccess} />
          <div className="main" style={{flexGrow:1}}>
          <Routes>

            <Route path='/' element={<PromptPageAPIDiscover isUploadSuccess={isUploadSuccess} setIsUploadSuccess={setIsUploadSuccess}/>} />
            <Route path='/extraction' element={<PromptPageAPIExtraction/>} />
            {/* <Route path='/' element={<PromptPageAPIDiscover />} /> */}
          </Routes>
          </div>
        </div>
      </div>
     
  )
}

export default App
