import React, { Component } from 'react';
import './index.css';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import * as TranslateLevels from '../../resources/translateLevels';


class Progress extends Component {
  render() {
    const { lexemes, poor, learning, mastered } = this.props.lexemes;
    return (
      <div className="Progress">
        <div className="leftCol">
          <h2>Progress</h2>
        </div>
        <div className="rightCol">
          You are learning <strong>{ lexemes.length }</strong> words.
          <p>The level is set to <strong>{ TranslateLevels.numToStr(this.props.level) }</strong>.</p>

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
