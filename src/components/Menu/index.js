import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';


const Menu = (props) => {
  return (
      <div className="Menu">

        {
          props.only
          ?
            <div className="only"><Link to={ '/' + props.only }>{ props.only }</Link></div>
          :
            <span>
              <div className="burger" >
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="dropdown">
                { props.not === 'logout' || <Link to="/logout">logout</Link> }
                { props.not === 'settings' || <Link to="/settings">settings</Link> }
                { props.not === 'summary' || <Link to="/summary">summary</Link> }
                { props.not === 'about' || <Link to="/about">about</Link> }
              </div>
            </span>
        }

      </div>
    );
}


export default Menu;
