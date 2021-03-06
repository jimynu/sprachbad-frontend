import React, { Component } from 'react';
import './index.css';


class ProgressBar extends Component {

  constructor(props) {
    super(props);
    this.state = this.calcPercent();
  }

  calcPercent = () => {
    const { poor, learning, mastered } = this.props;
    const total = poor + learning + mastered;

    return { // calculate percentage, 2% as baseline
      poor: poor/total*94+2,
      learning: learning/total*94+2,
      mastered: mastered/total*94+2,
    }
  }

  render() {
    return (
        <div className="ProgressBar">
          <div className="poor" style={{ width: this.state.poor + '%' }} >
            { this.state.poor > 15 && '◔_◔' /* only display when enough space */ }
           </div>
          <div className="learning" style={{ width: this.state.learning + '%' }} >
            { this.state.learning > 15 && '◡‿◡' }
          </div>
          <div className="mastered" style={{ width: this.state.mastered + '%' }} >
            { this.state.mastered > 15 && '^‿^' }
          </div>
        </div>
    );
  }
}

export default ProgressBar;
