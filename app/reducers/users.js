import axios from 'axios'

// ---------------CONSTANTS---------------------------//
export const USERS = 'USERS'

// --------------ACTION CREATORS----------------------//

const getUsers = (users) => ({type: USERS, users})

// ------------REDUCER-------------------------------//

const reducer = (state = [], action) => {
  switch (action.type) {
    case USERS:
      return action.users
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

export default reducer
