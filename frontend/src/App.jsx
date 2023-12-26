
import './App.scss'
import Aside from './components/Aside/Aside'
import PromptPage from './components/PromptPage/PromptPage'

function App() {
  
  return (
    <div className='app'>
     <Aside/>
     <div className="main" style={{flexGrow:1}}><PromptPage /></div>
    </div>
  )
}

export default App
