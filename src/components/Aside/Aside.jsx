import './Aside.scss'
import { Link, NavLink } from "react-router-dom";
import FilesUpload from '../FilesUpload/FilesUpload';
import { MdOutlineBusinessCenter } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { FiThumbsUp } from "react-icons/fi";
import { BsFileEarmarkRuled } from "react-icons/bs";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { SiMinds } from "react-icons/si";
import metlifeLogo from '../../assets/metlife-logo2.png'

function Aside({setIsUploadSuccess}) {
  return (
    <div className='aside' >
        <div className="custom-scroll">
        {/* <div className='metlife-logo'><img src={metlifeLogo} alt="metlife logo" /></div>     */}
        <div className="aside__use-cases">
            <h3>Use Cases</h3>
        <ul>
            <li><NavLink to='/extraction' style={({isActive})=>{return isActive?{color:'white',fontWeight:800}:{}}}><MdOutlineBusinessCenter  size={20} style={{marginRight:'5px'}}/>
 Business rule extraction</NavLink></li>
            <li><NavLink to='/' style={({isActive})=>{return isActive?{color:'white',fontWeight:800}:{}}}><IoIosLink size={20} style={{marginRight:'5px'}}/>API discoverability</NavLink></li>
            <li><NavLink to='/best-practices' style={({isActive})=>{return isActive?{color:'white',fontWeight:800}:{}}}><FiThumbsUp size={17} style={{marginRight:'5px'}}/>Use best practices for API</NavLink></li>
        </ul>
        </div>
        <div className="aside__pinecode-indexes">
            <h3>Pinecode Indexes</h3>
        <ul>
            <li><Link to=''><BsFileEarmarkRuled size={15} style={{marginRight:'5px'}}/>Extract biz rule</Link></li>
            <li><Link to=''><RiCompassDiscoverLine size={20} style={{marginRight:'5px'}}/>DiscoveApi</Link></li>
            <li><Link to=''><FiThumbsUp size={17} style={{marginRight:'5px'}}/>API best practices</Link></li>
        </ul>
        </div>
        <div className="aside__filesupload-btn">
           <FilesUpload setIsUploadSuccess={setIsUploadSuccess}  />
        </div>
        </div>
    </div>
  )
}

export default Aside