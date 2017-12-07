import React, { Component } from 'react';
import Header from '../../components/Header';
import Level from '../../components/Settings/Level';
import Words from '../../components/Settings/Words';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/actions/user';


class SettingsContainer extends Component {

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
            <Level location={ this.props.location } />
            <Words />
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

export default connect(mapStateToProps)(SettingsContainer);
