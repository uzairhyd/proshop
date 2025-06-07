import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<div>Shopping Cart</div>} />
              <Route path='/login' element={<div>Login Screen</div>} />
              <Route path='/register' element={<div>Register Screen</div>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;