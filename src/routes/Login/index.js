import React from 'react';
import Header from '../../components/Header';
import LoginForm from '../../components/LoginForm';
import Menu from '../../components/Menu';


const Login = () => {
  return (
    <div className="App">
      <div className="smallscreen">
        <h2>Small screens are not supported at this moment.</h2>
      </div>

      <Header />
      <Menu only="about" />
      <LoginForm />
    </div>
  );
}


export default Login;
