import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import BathSentence from '../../components/BathSentence';
import BathProgressBar from '../../components/BathProgressBar';
import { fetchUser } from '../../store/actions/user';
import { runBath, reportSuccess } from '../../store/actions/bath';
import Menu from '../../components/Menu';


class Bath extends Component {

  componentDidMount() {
    if ( this.props.user.id ) {
      this.props.dispatch(runBath());
      return;
    }

    // no user in state
    const tokenFromLocalStorage = localStorage.getItem('token');
    if ( tokenFromLocalStorage ) {
      this.props.dispatch( fetchUser(tokenFromLocalStorage) )
        .then( () => this.props.dispatch(runBath()) )
    } else {
      this.props.history.push('/login')
    }
  }

  checkAnswer = (success, answer) => {
    this.props.dispatch( reportSuccess(this.props.lexemeId, success, answer) );
  }

  render() {
    if (this.props.finished) {
      setTimeout( () => { this.props.history.push('/summary'); }, 100);
    }

    const { q, a, img, wrongPercent, correctPercent } = this.props;

    return (
      <div className="App">
        <Header />
        <Menu />
        { q &&  <BathSentence q={ q } a={ a } img={ img } checkAnswer={ this.checkAnswer } /> }
        <BathProgressBar correct={ correctPercent } wrong={ wrongPercent } />
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  console.log(state);
  if ( state.bath.current === -1 ) return { user: state.user }; // not ready yet

  else if ( state.bath.finished ) {
    return { user: state.user, finished: true };
  }

  else {
    const sentence = state.bath.sentences[state.bath.current];
    const { correct, wrong, total } = state.bath.progress

    return {
      user: state.user,
      lexeme: sentence.lexeme,
      lexemeId: sentence.lexemeId,
      a: sentence.task.a,
      q: sentence.task.q,
      img: sentence.task.img,
      correctPercent: correct / total * 100,
      wrongPercent: wrong / total * 100,
    };
  }
}

export default connect(mapStateToProps)(Bath);
