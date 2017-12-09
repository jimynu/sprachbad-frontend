import React from 'react';
import './index.css';


const LoggedInUser = (props) => {
  return (
    <div className="LoggedInUser">
      <span className="icon ion-person" />
      { props.username.toUpperCase() }
    </div>
  );
}

export default LoggedInUser;
