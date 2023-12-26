import './Aside.scss'
import { Link } from "react-router-dom";
import FilesUpload from '../FilesUpload/FilesUpload';
import { MdOutlineBusinessCenter } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { FiThumbsUp } from "react-icons/fi";
import { BsFileEarmarkRuled } from "react-icons/bs";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { SiMinds } from "react-icons/si";

function Aside() {
  return (
    <div className='aside' >
        <div className="custom-scroll">
        <h1><SiMinds style={{marginRight:'5px'}}/>Gen AI</h1>
        <div className="aside__use-cases">
            <h2>Use Cases</h2>
        <ul>
            <li><Link to=''><MdOutlineBusinessCenter  size={20} style={{marginRight:'5px'}}/>
 Business rule extraction</Link></li>
            <li><Link to=''><IoIosLink size={20} style={{marginRight:'5px'}}/>API discoverability</Link></li>
            <li><Link to=''><FiThumbsUp size={17} style={{marginRight:'5px'}}/>Use best practices for API</Link></li>
        </ul>
        </div>
        <div className="aside__pinecode-indexes">
            <h2>Pinecode Indexes</h2>
        <ul>
            <li><Link to=''><BsFileEarmarkRuled size={15} style={{marginRight:'5px'}}/>Extract biz rule</Link></li>
            <li><Link to=''><RiCompassDiscoverLine size={20} style={{marginRight:'5px'}}/>DiscoveApi</Link></li>
            <li><Link to=''><FiThumbsUp size={17} style={{marginRight:'5px'}}/>API best practices</Link></li>
        </ul>
        </div>
        <div className="aside__filesupload-btn">
           <FilesUpload/>
        </div>
        </div>
    </div>
  )
}

export default Aside
