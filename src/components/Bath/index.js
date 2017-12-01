import React, { Component } from 'react';
import './index.css';


class Bath extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    }
  }

  handleInput = (event) => {
    this.setState( {answer: event.currentTarget.value} );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState( {answer: ''} );
    this.props.checkAnswer(this.state.answer);
  }

  render() {
    return (
      <div className="Bath">
        <form onSubmit={ this.handleSubmit }>
          <div className="sentence"><h1>
          { this.props.q[0] }
          <input type="text" maxLength={ this.props.a.length } style={{ width: this.props.a.length + 0.1 + 'ch' }} onChange={ this.handleInput } value={ this.state.answer } />
          { this.props.q[1] }
          </h1></div>
        </form>
      </div>
    );
  }
}

export default Bath;
