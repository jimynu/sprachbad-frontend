import React, { Component } from 'react';
import './index.css';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';


class Progress extends Component {
  render() {
    return (
      <div className="Progress">
        <div className="leftCol">
          <h2>Progress</h2>
        </div>
        <div className="rightCol">
          You are learning 47 words.

          <br/><br/><ProgressBar poor="4" learning="2" mastered="2" />

          <br/><br/>
          <button><span className="icon ion-edit" />add/remove words</button>&nbsp;&nbsp;
          <button><span className="icon ion-podium" />change level</button>&nbsp;&nbsp;
          <Link to="bath"><button className="default">learn!</button></Link>

        </div>
      </div>
    );
  }
}

export default Progress;
