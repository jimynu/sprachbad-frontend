import React from 'react';
import Header from '../../components/Header';
import LoginForm from '../../components/LoginForm';
import Menu from '../../components/Menu';


const Login = () => {
  return (
    <div className="App">
      <Header title="Login" />
      <Menu only="about" />
      <LoginForm />
    </div>
  );
}


export default Login;
