import React, {useState, useEffect} from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete   

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    }
    else {
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate, successDelete])

  const deleteHander = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Dispatch delete user action here
      dispatch(deleteUser(id))
    }
  } 
  
  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? (
                  <i className='fas fa-check' style={{ color: 'green' }}></i>
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHander(user._id)}>
                    <i className='fas fa-trash'></i>
                  </Button> 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListScreen