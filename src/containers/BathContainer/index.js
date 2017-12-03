import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Bath from '../../components/Bath';
import BathProgress from '../../components/Bath/BathProgress';
import { runBath, reportSuccess } from '../../store/actions/bath';


class BathContainer extends Component {

  componentDidMount() {
    runBath()
      .then( bath => {
        if (bath) return this.props.dispatch(bath)
      })
  }

  checkAnswer = (success, answer) => {
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
    
    if (this.props.done) {
      setTimeout( () => { this.props.history.push('/summary'); }, 100);
    }

    const { q, a, wrongPercent, correctPercent } = this.props;
    return (
      <div className="App">
        <Header />
        <div style={{textAlign: 'center'}}>
        { q
          ? <Bath q={ q } a={ a } checkAnswer={ this.checkAnswer } />
          : '' }
        </div>
        <BathProgress correct={ correctPercent } wrong={ wrongPercent } />
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
    //
    // const pos = sentence.task.q.indexOf(' ' + sentence.task.a + ' ');
    // const left = sentence.task.q.substring( 0, pos );
    // const right = sentence.task.q.substring( pos + sentence.task.a.length + 2 );

    const { correct, wrong, total } = state.bath.progress

    return {
      lexeme: sentence.lexeme,
      lexemeId: sentence.lexemeId,
      a: sentence.task.a,
      q: sentence.task.q,
      correctPercent: correct / total * 100,
      wrongPercent: wrong / total * 100,
    };
  }
}

export default connect(mapStateToProps)(BathContainer);
