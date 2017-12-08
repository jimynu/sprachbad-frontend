import React, { Component } from 'react';
import Header from '../../components/Header';
import SetLevel from '../../components/SetLevel';
import SetWords from '../../containers/SetWords';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/actions/user';


class Settings extends Component {

  componentDidMount() {
    // here would be checked if user is logged in (or in localStorage)
    fetchUser()
      .then( action => {
        if (action && action.payload._id) this.props.dispatch(action);
      });
  }

  render() {
    return (
      <div className="App">
        <Header title="Settings" />
        {
          this.props.user.id &&
          <span>
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
