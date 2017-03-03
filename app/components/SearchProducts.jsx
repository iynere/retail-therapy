import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {findProduct} from '../reducers/product'
import {browserHistory} from 'react-router'

class SearchProducts extends React.Component{
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount(props){
    function onSubmit(){
      evt.preventDefault()
      const productName = evt.target.search.value
      const productList = props.products
      const productId = props.product.id
      props.findProduct(productName)
      console.log('this are the props', props)
      browserHistory.push(`/product/${productId}`) 
    }
  }
  render(){
    return(
      <div className="row">
        <div className="col-lg-6">
          <div className="input-group">
            <form onSubmit={this.state.onSubmit}>
              <input name='search' type="text" className="form-control" placeholder="Search for..."/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </button>
                </span>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

    product: state.product //this is not working

});

const mapDispatchToProps = dispatch => ({
    findProduct: (productName) => {
      dispatch(findProduct(productName));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts)
