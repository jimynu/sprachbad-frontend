import React, { Component } from 'react';
import Header from '../../components/Header';
import SetLevel from '../../components/SetLevel';
import SetWords from '../../containers/SetWords';
import LoggedInUser from '../../components/LoggedInUser';
import Menu from '../../components/Menu';

import { connect } from 'react-redux';
import { fetchUser } from '../../store/actions/user';


class Settings extends Component {

  componentDidMount() {
    if ( !this.props.user.id ) {
      //local storage or -> login
      const tokenFromLocalStorage = localStorage.getItem('token');
      if ( tokenFromLocalStorage ) {
        this.props.dispatch( fetchUser(tokenFromLocalStorage) )
          .then( (action) => {
            if ( action.payload.error ) return this.props.history.push('/login');
          })
      } else {
        this.props.history.push('/login')
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header title="Settings" />
        <Menu not="settings" />
        {
          this.props.user.id &&
          <span>
            <LoggedInUser username={this.props.user.name} />
            <SetLevel location={ this.props.location } />
            <SetWords />
          </span>
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {

  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Settings);
