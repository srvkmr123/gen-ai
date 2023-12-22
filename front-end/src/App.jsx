
import './App.scss'
import Aside from './components/Aside/Aside'

function App() {
  
  return (
    <div className='app'>
     <Aside/>
     <div className="main" style={{background:'green',flexGrow:2}}>main</div>
    </div>
  )
}

export default App
