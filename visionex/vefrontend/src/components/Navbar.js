import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import logo from '../new_logo-removebg-preview.png'


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu =() => setClick(false);

  const showButton = ()  => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton()
  },[]);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={logo} alt="VEC logo" className='navbar-logo-img' /> VEC 
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>  
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
                <Link  to='/' className='nav-links' onClick={closeMobileMenu}>
                   Home 
                </Link>
            </li>
            <li className='nav-item'>
                <Link  to='/services' className='nav-links' onClick={closeMobileMenu}>
                   Services 
                </Link>
            </li>
            <li className='nav-item'>
                <Link  to='/programs' className='nav-links' onClick={closeMobileMenu}>
                   Programs 
                </Link>
            </li>
            <li className='nav-item'>
                <Link  to='/universities' className='nav-links' onClick={closeMobileMenu}>
                   Universities 
                </Link>
            </li>
            <li className='nav-item'>
                <Link  to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                   Register 
                </Link>
            </li>
            <li className='nav-item'>
                <Link  to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                   Sign In 
                </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' to='/sign-up'>SIGN UP</Button>}
          {button && <Button buttonStyle='btn--outline' to='/login'>SIGN IN</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
