import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { fetchMyLexemes, addToBath, removeFromBath } from '../../store/actions/user';
import { fetchLexemes } from '../../store/actions/lexemes';
import { Link } from 'react-router-dom';


class Words extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      filterTextLowerCase: '',
      exactlyOneResult: false,
      foundLexeme: null,
    }
  }

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

  checkIfExactlyOneResult = (filterTextLowerCase = this.state.filterTextLowerCase) => {
    const filteredLexemes = this.props.addableLexemes.filter( lexeme => lexeme.lexeme.toLowerCase().indexOf(filterTextLowerCase) !== -1 );

    const exactlyOneResult = filteredLexemes.length === 1;
    this.setState({ exactlyOneResult, foundLexeme: filteredLexemes[0] });
  }

  handleInput = (event) => {
    const filterText = event.currentTarget.value;
    this.setState({ filterText: filterText, filterTextLowerCase: filterText.toLowerCase() });
    this.checkIfExactlyOneResult(filterText.toLowerCase());
  }

  handleSubmit = (event) => { // clicked "add"
    event.preventDefault();
    addToBath(this.state.foundLexeme.id)
      .then( (action) => this.props.dispatch(action) );

    this.setState({
      exactlyOneResult: false,
      filterText: '',
      filterTextLowerCase: '',
      foundLexeme: null,
    });
  }

  handleAdd = (event) => { // clicked lexeme
    addToBath(event.currentTarget.id)
      .then( (action) => {
        this.props.dispatch(action)
        this.checkIfExactlyOneResult();
      } );
  }

  handleRemove = (event) => {
    removeFromBath(event.currentTarget.id)
      .then( (action) => {
        this.props.dispatch(action)
        this.checkIfExactlyOneResult();
      });
  }

  render() {
    return (
      <div className="Words">

        <div className="chosen">
          <div className="leftCol">
            <h2>Your Bath</h2>
          </div>
          <div className="rightCol">
            These are the words you&#39;ve chosen.
            { this.props.chosenLexemes.length > 0 &&
              <Link to="bath"><button className="default" style={{ marginLeft: 15 + 'px' }}>learn!</button></Link>
            }

            <div className="chosen-words">

              { this.props.chosenLexemes
                  .map( lexeme => {
                    return (
                      <div className="word" key={ lexeme.id } >
                        { lexeme.lexeme }
                        <div className="removeButton" id={ lexeme.id } onClick={ this.handleRemove } />
                      </div>
                    )
                  })
              }

            </div>
            <div style={{clear: 'both'}}></div>
          </div>
        </div>

        <div className="add">
          <div className="leftCol">
            <h2>Add Words</h2>
          </div>
          <div className="rightCol">

            <div className="filter">
              <form onSubmit={ this.handleSubmit }>
                <input type="text" placeholder="filter" value={ this.state.filterText } onChange={ this.handleInput } />
                <button className="small default" style={{ marginLeft: 20 + 'px' }}
                  disabled={ !this.state.exactlyOneResult } >
                  <span className="icon ion-plus-circled" />
                  add
                </button>
              </form>
            </div>

            <div className="suggested-words">

            { this.props.addableLexemes
                .filter( lexeme => lexeme.lexeme.toLowerCase().indexOf(this.state.filterTextLowerCase) >= 0 )
                .map( (lexeme) => {
                  return (
                    <div className="word" key={ lexeme.id } id={ lexeme.id } onClick={ this.handleAdd } >
                      { lexeme.lexeme }
                    </div>
                  )
                })
            }

            </div>
            <div style={{clear: 'both'}}></div>
          </div>
        </div>

      </div>
    );
  }
}



const mapStateToProps = (state) => {

  // console.log(state.user.lexemes);
  const chosenLexemes = state.user.lexemes
    .map( ({ lexeme }) => ({ id: lexeme._id, lexeme: lexeme.lexeme }) )
    .sort( (a, b) => {
      const lexA = a.lexeme.toLowerCase();
      const lexB = b.lexeme.toLowerCase();

      if( lexA < lexB ) return -1;
      if( lexA > lexB ) return 1;
      return 0;
    });
  // console.log(chosenLexemes);

  const idsOfChosenLexemes = chosenLexemes.map( ({ id }) => id );
  // console.log(idsOfChosenLexemes);

  // console.log(state.lexemes);
  const addableLexemes = state.lexemes
    .map( lexeme => ({ id: lexeme._id, lexeme: lexeme.lexeme }) )
    .filter( lexeme => idsOfChosenLexemes.indexOf(lexeme.id) === -1 )
    .sort( (a, b) => {
      const lexA = a.lexeme.toLowerCase();
      const lexB = b.lexeme.toLowerCase();

      if( lexA < lexB ) return -1;
      if( lexA > lexB ) return 1;
      return 0;
    });

  // console.log(addableLexemes);

  return {
    chosenLexemes,
    addableLexemes,
    lexemesLoaded: state.lexemes.length > 0,
    userLexemesLoaded: state.user.lexemesLoaded,
  };
}

export default connect(mapStateToProps)(Words);
