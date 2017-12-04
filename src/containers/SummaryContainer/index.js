import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Summary from '../../components/Summary';
import { resetCurrent } from '../../store/actions';
import { fetchMyLexemes } from '../../store/actions/user';
import { connect } from 'react-redux';


class SummaryContainer extends Component {

  componentDidMount() {
    this.props.dispatch(resetCurrent); // reset "pointer" of current task in learning session

    if ( !this.props.myLexemes ) {
      fetchMyLexemes()
        .then( (action) => this.props.dispatch(action) );
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          <Header title="Summary" />
          {
            this.props.myLexemes
            ? <Summary
                lexemes={ this.props.myLexemes }
                showRecap={ this.props.bathLoaded } />
            : ''
          }
        </div>
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {

  if ( state.user.lexemes ) {
    const lexemes = state.user.lexemes;
    const myLexemes = {
      lexemes,
      poor: lexemes.filter( ({ progress }) => progress <= 1 ).length,
      learning: lexemes.filter( ({ progress }) => progress > 1 && progress < 5 ).length,
      mastered: lexemes.filter( ({ progress }) => progress >= 5 ).length,
    };

    return {
      myLexemes,
      bathLoaded: state.bath.sentences
    };
  }

  return { user: state.user };
}

export default connect(mapStateToProps)(SummaryContainer);
