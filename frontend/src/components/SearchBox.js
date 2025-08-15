import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}&page=1`)
    } 
  }
    return (
        <Form onSubmit={submitHandler}  className="d-flex">
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products...'
            className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
            Search
        </Button>
        </Form>
    )
}

export default SearchBox