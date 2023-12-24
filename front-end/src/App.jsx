
import './App.scss'
import Aside from './components/Aside/Aside'

function App() {
  
  return (
    <div className='app'>
     <Aside/>
     <div className="main" style={{flexGrow:1}}>main</div>
    </div>
  )
}

export default App
