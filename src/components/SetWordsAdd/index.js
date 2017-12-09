import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { addToBath } from '../../store/actions/user';


class SetWordsAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      filterTextLowerCase: '',
      exactlyOneResult: false,
      foundLexeme: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkIfExactlyOneResult(this.state.filterTextLowerCase, nextProps);
  }

  checkIfExactlyOneResult = (filterTextLowerCase = this.state.filterTextLowerCase, props = this.props) => {
    const filteredLexemes = props.addableLexemes.filter( lexeme => lexeme.lexeme.toLowerCase().indexOf(filterTextLowerCase) !== -1 );
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
    this.props.dispatch( addToBath(this.state.foundLexeme.id) );

    this.setState({
      exactlyOneResult: false,
      filterText: '',
      filterTextLowerCase: '',
      foundLexeme: null,
    });
  }

  handleAdd = (event) => { // clicked lexeme
    this.props.dispatch( addToBath(event.currentTarget.id) )
      .then( () => this.checkIfExactlyOneResult() );
  }

  render() {
    return (
      <div className="add">
        <div className="leftCol">
          <h2>Add to Bath</h2>
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
    )
  }
}


export default connect()(SetWordsAdd);
