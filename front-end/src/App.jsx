import { Routes,Route } from 'react-router-dom'
import './App.scss'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import PromptPageAPIDiscover from './components/PromptPageAPIDiscover/PromptPageAPIDiscover'
import PromptPageAPIExtraction from './components/PromptPageAPIExtraction/PromptPageAPIExtraction'

function App() {
  
  return (
    < div className='app'>
      <div>
        <Header/>
        </div>
        <div className="main-content">
          <Aside/>
          <div className="main" style={{flexGrow:1}}>
          <Routes>
            <Route path='/' element={<PromptPageAPIDiscover/>} />
            <Route path='/extraction' element={<PromptPageAPIExtraction/>} />
          </Routes>
          </div>
        </div>
      </div>
     
  )
}

export default App
