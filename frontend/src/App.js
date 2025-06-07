import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className='py-3'>
         <Container>
            <h1>Welcome to the React App</h1>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;