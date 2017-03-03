import React from 'react'
import Navbar from './Navbar'
// import Footer once we make one

const Root = ({children}) => {
  return (
		<div id="main" className="container-fluid">
          <Navbar />
          { children }
          {/*<Footer /> */}
	    </div>
	)
}

export default Root
