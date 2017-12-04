import React, { Component } from 'react';
import './index.css';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';


class Progress extends Component {
  render() {
    const { lexemes, poor, learning, mastered } = this.props.lexemes;
    return (
      <div className="Progress">
        <div className="leftCol">
          <h2>Progress</h2>
        </div>
        <div className="rightCol">
          You are learning { lexemes.length } words.

          <ProgressBar poor={ poor } learning={ learning } mastered={ mastered } />

          <div className="actionButtons">
            <Link to="settings#words"><button><span className="icon ion-edit" />choose words</button></Link>
            <Link to="settings#level"><button><span className="icon ion-podium" />change level</button></Link>
            <Link to="bath"><button className="default">learn!</button></Link>
          </div>

        </div>
      </div>
    );
  }
}

export default Progress;
