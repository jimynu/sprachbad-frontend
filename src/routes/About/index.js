import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Menu from '../../components/Menu';


const About = (props) => {
  return (
    <div className="App">
      <Header />

      {
        props.loggedIn
        ?
          <Menu not="about" />
        :
          <Menu only="login" />
      }


      <div className="About">

        <div className="leftCol">
          <h2>
            About
          </h2>
        </div>
        <div className="rightCol">
          <strong>Sprachbad</strong> helps you master the <em>Awful German Language</em>, as one American author famously called it. It is a vocabulary trainer with a slight twist: It serves you sentences in German – not English words to translate.
          <div style={{ marginTop: 30 + 'px' }} />

          <strong>The idea behind</strong> Sprachbad is to provide context so you can connect the dots. Your brain is a neural network that needs to connect nodes – preferably German to German. This is how Sprachbad enables you to grow your language skills.
        </div>

        <div style={{ marginTop: 30 + 'px' }} />

        <div className="leftCol">
          <h2>
            Contact
          </h2>
        </div>
        <div className="rightCol">
          This web app was coded in December 2017 by Kim Beyeler as a capstone project concluding the Propulsion Coding Bootcamp in Zürich. Contact me at <em>hello@spachbad.com</em>.
        </div>

      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return { loggedIn: !!state.user.id };
}

export default connect(mapStateToProps)(About);
