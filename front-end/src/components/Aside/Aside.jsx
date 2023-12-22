import './Aside.scss'
import { Link } from "react-router-dom";
import FilesUpload from '../FilesUpload/FilesUpload';

function Aside() {
  return (
    <div className='aside'>
        <h1>Gen AI</h1>
        <div className="aside__use-cases">
            <h2>Use Cases</h2>
        <ul>
            <li><Link to=''>Business rule extraction</Link></li>
            <li><Link to=''>API discoverability</Link></li>
            <li><Link to=''>Use best practices for API</Link></li>
        </ul>
        </div>
        <div className="aside__pinecode-indexes">
            <h2>Pinecode Indexes</h2>
        <ul>
            <li><Link to=''>Extract biz rule</Link></li>
            <li><Link to=''>DiscoveApi</Link></li>
            <li><Link to=''>API best practices</Link></li>
        </ul>
        </div>
        <div className="aside__filesupload-btn">
           <FilesUpload/>
        </div>
    </div>
  )
}

export default Aside