import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user  
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED,
  user: user
})

// Current status: 
// Able to get user on localStorage (userId) and the DB
// Does create a cart, but it logs them in, which we don't want (Eventually, instead of logging in, we should check their localStorage for a userId)
// The cart is very buggy in the navbar
export const anonCreateCart = (productId) => dispatch => 
  axios.post(`/api/auth/anon/${productId}`)
    .then(res => {
      localStorage.userId = res.data.id
      dispatch(authenticated(res.data))
    })
    .catch(() => dispatch(whoami())) 

export const signup = (name, email, password) => dispatch =>
    axios.post('/api/auth/local/signup', {name, email, password})
      .then(() => dispatch(login(email, password)))
      .catch(() => dispatch(whoami()))

export const login = (username, password) =>
  dispatch =>
    axios.put('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))      

export const logout = () =>
  dispatch =>
    axios.put('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer