import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Summary from '../../components/Summary';
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
      <div>
        <div className="App">
          <Header title="Summary" />
          { this.props.myLexemes && this.props.user.id &&
            <Summary
              lexemes={ this.props.myLexemes }
              level={ this.props.user.level }
              showRecap={ this.props.showRecap }
            />
          }
        </div>
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  if ( state.user.lexemesLoaded ) {
    const lexemes = state.user.lexemes;
    const myLexemes = {
      lexemes,
      poor: lexemes.filter( ({ progress }) => progress <= 1 ).length,
      learning: lexemes.filter( ({ progress }) => progress > 1 && progress < 5 ).length,
      mastered: lexemes.filter( ({ progress }) => progress >= 5 ).length,
    };

    const bath = state.bath.sentences;

    return {
      myLexemes,
      showRecap: bath && bath[bath.length-1].answer,
      userLexemesLoaded: state.user.lexemesLoaded,
      user: state.user,
    };
  }

  return {};
}

export default connect(mapStateToProps)(SummaryContainer);
