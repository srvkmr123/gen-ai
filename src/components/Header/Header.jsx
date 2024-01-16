import React from 'react'
import metlifeLogo from '../../assets/download.jpeg'
import './Header.scss'

function Header() {
  return (
    <div className='header'>
      <div className="header-left">
        <div className="header-icon">
            <img src={metlifeLogo} alt="logo" />
        </div>
      </div>
    </div>
  )
}

export default Header