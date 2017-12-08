import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { fetchMyLexemes, removeFromBath } from '../../store/actions/user';
import { fetchLexemes } from '../../store/actions/lexemes';
import SetWordsChosen from '../../components/SetWordsChosen';
import SetWordsAdd from '../../components/SetWordsAdd';


class SetWords extends Component {

  componentDidMount() {
    if ( !this.props.userLexemesLoaded ) {
      fetchMyLexemes()
        .then( (action) => this.props.dispatch(action) );
    }

    if ( !this.props.lexemesLoaded ) {
      fetchLexemes()
        .then( (action) => this.props.dispatch(action) );
    }
  }

  handleRemove = (event) => {
    removeFromBath(event.currentTarget.id)
      .then( (action) => {
        this.props.dispatch(action)
      });
  }

  render() {
    return (
      <div className="Words">

        <SetWordsAdd
          addableLexemes={ this.props.addableLexemes } />

        <SetWordsChosen
          chosenLexemes={ this.props.chosenLexemes }
          handleRemove={ this.handleRemove } />

      </div>
    );
  }
}



const mapStateToProps = (state) => {

  const desiredLevel = `level${state.user.level}tasks`;
  const chosenLexemes = state.user.lexemes
    .map( ({ lexeme }) => {
      const { _id: _, ...rest } = lexeme;
      return { ...rest, id: lexeme._id};
    })
    .filter( lexeme => lexeme[desiredLevel] ) // only show lexemes that have tasks for selected level
    .sort( (a, b) => {
      const lexA = a.lexeme.toLowerCase();
      const lexB = b.lexeme.toLowerCase();
      if( lexA < lexB ) return -1;
      if( lexA > lexB ) return 1;
      return 0;
    });

  const idsOfChosenLexemes = chosenLexemes.map( ({ id }) => id );
  const addableLexemes = state.lexemes
    .map( ( lexeme ) => {
      const { _id: _, ...rest } = lexeme;
      return { ...rest, id: lexeme._id};
    })
    .filter( lexeme => idsOfChosenLexemes.indexOf(lexeme.id) === -1 )
    .filter( lexeme => lexeme[desiredLevel] ) // only show lexemes that have tasks for selected level
    .sort( (a, b) => {
      const lexA = a.lexeme.toLowerCase();
      const lexB = b.lexeme.toLowerCase();

      if( lexA < lexB ) return -1;
      if( lexA > lexB ) return 1;
      return 0;
    });



  return {
    chosenLexemes,
    addableLexemes,
    lexemesLoaded: state.lexemes.length > 0,
    userLexemesLoaded: state.user.lexemesLoaded,
  };
}

export default connect(mapStateToProps)(SetWords);
