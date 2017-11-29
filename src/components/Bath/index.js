import React, { Component } from 'react';
import './index.css';
import Recap from './Recap';
import Progress from './Progress';


class Summary extends Component {
  render() {
    return (
      <div className="Summary">
        { false ? <Recap /> : '' }
        <Progress />
      </div>
    );
  }
}

export default Summary;
