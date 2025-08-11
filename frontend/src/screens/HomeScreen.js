import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';


function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  const pageNumber = new URLSearchParams(location.search).get('page') || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);


  return (
    <div>
        <h1>Latest Products</h1>
        {
          loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) :
            <div>    
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))} 
              </Row>
              <Paginate pages={pages} page={page} keyword={keyword} />
            </div>
        }
       
    </div>
  )
}

export default HomeScreen

/*

Here’s how this code updates the Redux store:

1. **`const dispatch = useDispatch();`**  
   This gets the `dispatch` function from Redux, allowing you to send actions to the store.

2. **`useEffect(() => { dispatch(listProducts()); }, []);`**  
   This runs once when the component mounts.  
   It dispatches the `listProducts()` action.

3. **`listProducts()`**  
   This is an action creator (likely a thunk) that fetches product data (usually via an API call) and then dispatches another action (like `PRODUCT_LIST_SUCCESS`) with the fetched data.

4. **Reducer**  
   The reducer listens for the dispatched action and updates the store’s state with the new product data.

5. **Component Re-render**  
   Components using `useSelector` to read products from the store will re-render with the updated data.

**Summary:**  
Dispatching `listProducts()` triggers an async fetch, and when data arrives, the store is updated via a reducer, causing the UI to update.
*/