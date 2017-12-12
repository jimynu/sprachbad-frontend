import React, { Component } from 'react';
import './index.css';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import * as TranslateLevels from '../../resources/translateLevels';


class SummaryProgress extends Component {
  render() {
    const { lexemes, poor, learning, mastered } = this.props.lexemes;
    const lexemeCount = lexemes.length;
    return (
      <div className="Progress">
        <div className="leftCol">
          <h2>Progress</h2>
        </div>
        <div className="rightCol">
          {
            lexemeCount === 0
            ? 'There are no words to learn. Go ahead and choose some:'
            : <span>You are learning <strong>{ lexemeCount }</strong> { lexemeCount === 1 ? 'word' : 'words' } at <strong>{ TranslateLevels.numToStr(this.props.level) }</strong> level.
              <ProgressBar poor={ poor } learning={ learning } mastered={ mastered } /></span>
          }


          <div className="actionButtons">
            <Link to="settings#level"><button><span className="icon ion-podium" />change level</button></Link>
            <Link to="settings#words"><button className={ lexemeCount === 0 ? 'default' : '' }><span className="icon ion-edit" />choose words</button></Link>
            { lexemeCount > 0 &&
              <Link to="bath"><button className="default">learn!</button></Link>
            }
          </div>

        </div>
      </div>
    );
  }
}

export default SummaryProgress;
