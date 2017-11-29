import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Summary from '../../components/Summary';


class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Header title="Summary" />
          <Summary />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
