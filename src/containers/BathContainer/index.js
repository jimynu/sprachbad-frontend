import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import Header from '../../components/Header';


class BathContainer extends Component {

  componentDidMount() {
    //fetch a bath
  }

  reportSuccess = (id, sucess, lastTask=false) => {}

  render() {
    return (
      <div className="App">
        <Header title="Sprachbad" />
        { }
      </div>
    );
  }
}

export default BathContainer;
