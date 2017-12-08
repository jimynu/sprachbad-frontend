import React, { Component } from 'react';
import Header from '../../components/Header';
import Recap from '../../components/SummaryRecap';
import Progress from '../../components/SummaryProgress';

import { resetCurrent } from '../../store/actions';
import { fetchMyLexemes, fetchUser } from '../../store/actions/user';
import { connect } from 'react-redux';


class SummaryContainer extends Component {

  componentDidMount() {
    this.props.dispatch(resetCurrent); // reset "pointer" of current task in learning session

    if ( !this.props.userLexemesLoaded ) {
      fetchMyLexemes()
        .then( (action) => this.props.dispatch(action) );
    }

    if ( !this.props.user ) {
      fetchUser()
        .then( action => {
          if (action.payload._id) this.props.dispatch(action);
        });
    }
  }

  render() {
    return (
        <div className="App">
          <Header title="Summary" />
          { this.props.myLexemes && this.props.user.id &&

            <div className="Summary">
              { this.props.showRecap &&
                <Recap bath={ this.props.bath } />
              }
              <Progress lexemes={ this.props.myLexemes } level={ this.props.user.level } />
            </div>
          }
        </div>
    );
  }
}


const mapStateToProps = (state, props) => {

  if ( state.user.lexemesLoaded && state.user.id ) {

    // exclude lexemes that don't have tasks for selected level
    const desiredLevel = `level${state.user.level}tasks`;
    const lexemes = state.user.lexemes.filter( ({ lexeme }) => lexeme[desiredLevel]);

    const myLexemes = {
      lexemes,
      poor: lexemes.filter( ({ progress }) => progress <= 1 ).length,
      learning: lexemes.filter( ({ progress }) => progress > 1 && progress < 5 ).length,
      mastered: lexemes.filter( ({ progress }) => progress >= 5 ).length,
    };

    return {
      myLexemes,
      showRecap: state.bath.finished,
      userLexemesLoaded: state.user.lexemesLoaded,
      user: state.user,
      bath: state.bath,
    };
  }

  return {};
}

export default connect(mapStateToProps)(SummaryContainer);
