import React, { Component } from 'react';
import Header from '../../components/Header';
import Recap from '../../components/SummaryRecap';
import Progress from '../../components/SummaryProgress';
import LoggedInUser from '../../components/LoggedInUser';
import Menu from '../../components/Menu';

import { resetCurrent } from '../../store/actions';
import { fetchMyLexemes, fetchUser } from '../../store/actions/user';
import { connect } from 'react-redux';


class SummaryContainer extends Component {

  componentDidMount() {
    this.props.dispatch(resetCurrent); // reset "pointer" of current task in learning session

    if ( !this.props.user.id ) {
      //local storage or -> login
      const tokenFromLocalStorage = localStorage.getItem('token');
      if ( tokenFromLocalStorage ) {
        this.props.dispatch( fetchUser(tokenFromLocalStorage) )
          .then( () => {
            this.props.dispatch( fetchMyLexemes() );
          });
      } else {
        this.props.history.push('/login')
      }
    }

    if ( this.props.user.id && !this.props.userLexemesLoaded ) {
      this.props.dispatch( fetchMyLexemes() );
    }

  }

  renderTitle() {
    if ( this.props.location.pathname === '/summary' ) return 'Summary';
    if ( this.props.user.id && this.props.location.pathname === '/' ) return 'Welcome back!';
    return 'Logging in...';
  }

  render() {
    return (
        <div className="App">
          <Header title={ this.renderTitle() } />
          <Menu not="summary" />
          { this.props.myLexemes && this.props.user.id &&

            <div className="Summary">
              <LoggedInUser username={this.props.user.name} />
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


const mapStateToProps = (state) => {

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

  return { user: state.user };
}

export default connect(mapStateToProps)(SummaryContainer);
