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

          <br/><br/><ProgressBar poor={ poor } learning={ learning } mastered={ mastered } />

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
