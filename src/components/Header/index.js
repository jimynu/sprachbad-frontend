import React, { Component } from 'react';
import './index.css';


class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <h1>
            { this.props.title }
          </h1>
        </div>
      </header>
    );
  }
}

export default Header;
