import axios from 'axios'

// ---------------CONSTANTS---------------------------//
export const USERS = 'USERS'
export const USER_STATUS_UPDATE = 'USER_STATUS_UPDATE'
// --------------ACTION CREATORS----------------------//

const getUsers = (users) => ({type: USERS, users})

const updateUserStatus = (id, status) => ({type: USER_STATUS_UPDATE})

// ------------REDUCER-------------------------------//

const reducer = (state = [], action) => {
  switch (action.type) {

    case USERS:
      return action.users

    case USER_STATUS_UPDATE:
      return state
  }
  return state
}

// ---------------THUNK------------------------------//

export const fetchUsers = () =>
  dispatch => {
    axios.get('/api/users')
				 .then(users => dispatch(getUsers(users.data)))
				 .catch((err) => console.error(err))
  }

export const UpdateUsrStatus = (id, role) =>
  dispatch => {
    axios.put('/api/users', {id, role})
				 .then(users => dispatch(updateUserStatus(id, role)))
				 .catch((err) => console.error(err))
  }

export default reducer
