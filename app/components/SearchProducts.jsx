import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {findProduct} from '../reducers/product'
import {browserHistory} from 'react-router'

//TATI: maybe awkward having such a large func in you jsx
//TATI: watch indentation 

export function SearchProducts({products}){
    return(
      <div className="row">
        <div className="col-lg-3">
            <form id="search" onSubmit={
                function(evt){
                  evt.preventDefault()
                  const searchValue = evt.target.search.value
                  products.forEach(function(element){
                    if(element.name === searchValue){
                    browserHistory.push(`/allProducts/${element.id}`)
                    }
                    else return null;
                  })
                }
              }>
              <input name='search' type="text" className="form-control" placeholder="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                </button>
              </span>
            </form>
        </div>
        <div className="col-lg-6">
        </div>
      </div>
    )
  }

const mapStateToProps = (state) => ({

    products: state.products

});
/*
const mapDispatchToProps = dispatch => ({
    findProduct: (productName) => {
      dispatch(findProduct(productName));
    }
});
*/
export default connect(mapStateToProps)(SearchProducts)
