import React from 'react'
import {connect} from 'react-redux'

const AccountInfo = ({user}) => {
  const currentUser = user && user ? user : ''
  return (
    <div className="account-info-container">
      {currentUser ? <h2>{ currentUser.name || currentUser.email } Account Information</h2> : null}
      <div className="account-info-form">
        <form>
          <label>Name: </label>
            <input name="username" placeholder={ currentUser.name } />
          <label>Address: </label>
            <input name="address" placeholder={ currentUser.address } />
            <input type="submit" defaultValue="Update" />
             </form>
      </div>
    </div>
  )
}

export default connect(
  state => ({user: state.auth})
)(AccountInfo)
