import React, { Component } from 'react';
import './index.css';
import Recap from './Recap';
import Progress from './Progress';


class Summary extends Component {
  render() {
    return (
      <div className="Summary">
        { this.props.showRecap ? <Recap bath={this.props.bath} /> : '' }
        <Progress lexemes={ this.props.lexemes } />
      </div>
    );
  }
}

export default Summary;
