import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { addToCart } from '../actions/cartActions'

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const productId = id;
  const qty = Number(location.search ? new URLSearchParams(location.search).get('qty') : 1);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;



  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);


  const removeFromCartHandler = (id) => {
    // Dispatch an action to remove item from cart
    console.log(`Removing item with id: ${id}`);
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  }

  return (
    <div className='container'>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant='flush'>
            {cartItems.length === 0 ? (
              <ListGroup.Item>
                <Message variant='info'>
                  Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
              </ListGroup.Item>
            ) : (
              <>
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>Image</Col>
                    <Col md={3}>Product</Col>
                    <Col md={2}>Price</Col>
                    <Col md={2}>Qty</Col>
                    <Col md={2}></Col>
                  </Row>
                </ListGroup.Item>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, Number(e.target.value)))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </>
            )}
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  {/* reduce is hiher order function that iterates over the cartItems array */}
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  // onClick={() => navigate('/login?redirect=shipping')}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen