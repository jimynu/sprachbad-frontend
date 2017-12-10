import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { removeSession } from '../../store/actions';


class Logout extends Component {

  componentDidMount() {
    // dispatch abfeuern –> löscht state.user + localStorage
    this.props.dispatch(removeSession)
    //dann timer 2s –> history.push('/login')
    setTimeout( () => this.props.history.push('/login'), 1000);
  }

  render() {
    return (
      <div className="App">
        <Header title="Logging out..." />
      </div>
    );
  }
}


export default connect()(Logout);
