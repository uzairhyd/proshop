import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
          Welcome to the proshop
        <Footer />
      </div>
    );
  }
}

export default App;
