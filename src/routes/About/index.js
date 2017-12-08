import React from 'react';
import Header from '../../components/Header';


const About = () => {
  return (
    <div className="App">
      <Header />
      <div className="About">

        <div className="leftCol">
          <h2>
            About
          </h2>
        </div>
        <div className="rightCol">
          Sprachbad helps you master the "awful German language", as one American author famously called it. It does this by serving you sentences with vocabulary you want to learn.
          <div style={{ marginTop: 30 + 'px' }} />

          <strong>The idea</strong> is for you to see the words in different contexts, enabling you to grow your language skills by connecting the dots (a.k.a. neural nodes a.k.a. words) instead of connecting them to translations.
        </div>

        <div style={{ marginTop: 30 + 'px' }} />

        <div className="leftCol">
          <h2>
            Contact
          </h2>
        </div>
        <div className="rightCol">
          This app was coded in December 2017 by Kim Beyeler as a  capstone project of the Propulsion Coding Bootcamp in Zürich. Contact me at <em>hello@spachbad.com</em>
        </div>

      </div>
    </div>
  );
}

export default About;
