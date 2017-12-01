import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Bath from '../../components/Bath';
import { runBath, reportSuccess } from '../../store/actions/bath';


class BathContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    runBath()
      .then( bath => {
        if (bath) return this.props.dispatch(bath)
      })
  }

  checkAnswer = (answer) => {
    //feedback (to be improved with colors, in place, timing etc.)
    const success = ( answer === this.props.a );
    if ( success ) {
      this.setState({ message: '*\\ O /*' });
    } else {
      this.setState({ message: this.props.a });
    }

    reportSuccess(this.props.lexemeId, success, answer)
      .then(action => {
        if (action.payload) {
          this.props.dispatch( action );
        } else {
          this.setState({ message: action.message });
        }
      })
  }

  render() {
    return (
      <div className="App">
        <Header title="Sprachbad" />
        <div className="main message">
          { this.state.message }
        </div>
        <div style={{textAlign: 'center'}}>
        { this.props.done ? this.props.history.push('/summary') : ''}
        { this.props.q
          ? <Bath q={ this.props.q } a={ this.props.a } checkAnswer={ this.checkAnswer } />
          : 'Preparing your bath...' }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  if ( state.bath.current === -1 ) return {}; // not ready yet

  else if ( state.bath.current >= state.bath.sentences.length ) {
    return {done: true}; // finished
  }

  else {
    const sentence = state.bath.sentences[state.bath.current];

    const pos = sentence.task.q.indexOf(' ' + sentence.task.a + ' ');
    const left = sentence.task.q.substring( 0, pos );
    const right = sentence.task.q.substring( pos + sentence.task.a.length + 2 );

    return {
      lexeme: sentence.lexeme,
      lexemeId: sentence.lexemeId,
      a: sentence.task.a,
      q: [ left, right ],
    };
  }
}

export default connect(mapStateToProps)(BathContainer);
