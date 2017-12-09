import React, { Component } from 'react';
import './index.css';
import { nextSentence } from '../../store/actions';
import { connect } from 'react-redux';


class BathSentence extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      submitted: false,
      result: '',
      correction: '',
    }
  }

  handleInput = (event) => {
    this.setState( {answer: event.currentTarget.value} );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const givenAnswer   = this.state.answer;
    const correctAnswer = this.props.a;

    if ( givenAnswer === '' ) return;

    const success     =  givenAnswer.toLowerCase() === correctAnswer.toLowerCase();
    const properCase  =  givenAnswer === correctAnswer;

    if ( success && properCase ) {
      this.setState({ submitted: true, result: 'correct' });
    } else if (success) {
      this.setState({ submitted: true, result: 'correct', correction: correctAnswer });
    } else {
      this.setState({ submitted: true, result: 'wrong', correction: correctAnswer });
    }

    this.props.checkAnswer( success, givenAnswer );

    setTimeout( () => {
      this.setState( { answer: '', submitted: false, result: '', correction: '' } );
      this.props.dispatch(nextSentence);
    }, 1200);
  }

  render() {
    const {q, a} = this.props;
    return (
      <div className="Bath">
        <form onSubmit={ this.handleSubmit }>
          <div className={ this.state.submitted ? 'sentence fadeOut' : 'sentence' } >
            <h1>
              { q[0] }
              <input type="text"
                autoFocus
                maxLength={ a.length }
                style={{ width: a.length + 0.1 + 'ch' }}
                className={ this.state.submitted ? this.state.result : '' }
                onChange={ this.handleInput }
                value={ this.state.answer } />
              <div
                className={ this.state.correction === '' ? 'popoverWrapper' : 'popoverWrapper show' } >
                <span className="correctionPopover">{ this.state.correction }</span>
              </div>
              { q[1] }
            </h1>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(BathSentence);
