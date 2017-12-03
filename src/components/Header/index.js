import React, { Component } from 'react';
import './index.css';
import logo from './logo_header.png';


class Header extends Component {
  render() {
    return (
      <header>
        <div>
          { this.props.title
            ? <h1>{ this.props.title }</h1>
            : <div className="centered"><img src={logo} alt="logo" /></div>
          }
        </div>
      </header>
    );
  }
}

export default Header;
