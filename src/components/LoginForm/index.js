import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login, signup, fetchUser } from '../../store/actions/user';
import './index.css';


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginFailed: false,
      message: '',
    }
  }

  componentDidMount() {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if ( tokenFromLocalStorage ) {
      this.props.dispatch( fetchUser(tokenFromLocalStorage) )
        .then( () => {
          if ( this.props.loggedIn ) this.props.history.push('/');
        });
    }
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.currentTarget.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.currentTarget.value });
  }

  handleLogin = (event) => {
    event.preventDefault();

    if ( this.state.username === '' || this.state.password === '' ) {
      this.setState({ loginFailed: true });
      setTimeout( () => this.setState({ loginFailed: false }), 600);
      return;
    }

    login( this.state.username, this.state.password )
      .then( action => {
        if (!action.payload.error) {
          this.props.dispatch(action);
          this.props.history.push('/')
        } else {
          this.setState({ username: '', password: '', loginFailed: true, message: '' });
          setTimeout( () => this.setState({ loginFailed: false }), 600);
        }
      })
      .catch( error => { } );
  }

  handleSignup = (event) => {
    event.preventDefault();

    if ( this.state.username.length < 3 || this.state.password.length < 6 ) {
      this.setState({ message: 'Choose a username with at least 3 and a password with at least 6 characters.' });
      return;
    }

    signup( this.state.username, this.state.password )
      .then( message => {
        this.setState({ message });
      })
  }

  render() {
    return (
      <div className="Login">
        <form>

          <div className="">
            <input type="text" placeholder="username" onChange={ this.handleUsernameChange } value={ this.state.username } />
          </div>

          <div className="">
            <input type="password" placeholder="password" onChange={ this.handlePasswordChange } value={ this.state.password } />
          </div>

          <button className={ this.state.loginFailed ? 'default login-failed' : 'default' } onClick={ this.handleLogin } >
            Login
          </button>

          <button onClick={ this.handleSignup } >
            signup
          </button>

        </form>

        {this.state.message}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { loggedIn: !!state.user.id };
}

export default connect(mapStateToProps)(withRouter(LoginForm));
