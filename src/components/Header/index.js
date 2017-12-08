import React from 'react';
import './index.css';
import logo from './logo_header.png';


const Header = (props) => {
  return (
    <header>
      <div>
        { props.title
          ? <h1>{ props.title }</h1>
          : <div className="centered"><img src={logo} alt="logo" /></div>
        }
      </div>
    </header>
  );
}

export default Header;
