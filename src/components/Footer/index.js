import React, { Component } from 'react';
import './index.css';


class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <div className="leftCol">
            <h2>
              Sprachbad
            </h2>
          </div>
          <div className="rightCol">
            <strong>About</strong> Sprachbad helps you master the awful German language.
            <br/><br/><strong>Contact</strong> Kim
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
