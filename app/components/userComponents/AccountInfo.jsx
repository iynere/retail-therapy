import React from 'react'
import {connect} from 'react-redux'

const AccountInfo = ({user}) => {
  return (
    <div className="account-info-container">
      <h2>{user.name} Account Information</h2>
      <div className="account-info-form">
        <form>
          <label>Name: </label>
          <input name="username" defaultValue={user.name} required/>
          <label>Address: </label>
			    <input name="address" defaultValue={user.address ? user.address : ''} />
			    <input type="submit" defaultValue="Update" />
		    </form>
      </div>
    </div>
  )
}

export default connect(
  state => ({user: state.auth})
)(AccountInfo)
