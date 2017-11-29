import React, { Component } from 'react';
import './index.css';


class ProgressBar extends Component {

  constructor(props) {
    super(props);
    this.state = this.calcPercent();
  }

  calcPercent = () => {
    console.log(this);
    const poor = parseFloat(this.props.poor);
    const learning = parseFloat(this.props.learning);
    const mastered = parseFloat(this.props.mastered);
    const total = poor + learning + mastered;
    console.log(total);

    return {
      poor: poor/total*100,
      learning: learning/total*100,
      mastered: mastered/total*100,
    }
  }

  render() {
    return (
        <div className="ProgressBar">
          <div className="poor" style={{ width: this.state.poor + '%' }} > ◔_◔ </div>
          <div className="learning" style={{ width: this.state.learning + '%' }} >  ◡‿◡ </div>
          <div className="mastered" style={{ width: this.state.mastered + '%' }} > ^‿^ </div>
        </div>
    );
  }
}

export default ProgressBar;
