import React from 'react'
import {connect} from 'react-redux'
import {editProduct} from 'APP/app/reducers/product'

export const EditProduct = props => {
  console.log('edit product is getting', props)
  const fetchedProduct = props.product
  var editProduct = function(evt){
      evt.preventDefault()
      const product = {
          name: evt.target.name.value,
          description: evt.target.description.value,
          price: evt.target.price.value,
          photoUrl: evt.target.photo.value,
          stock: evt.target.stock.value
          //categories: evt.target.categories.value,
      }
      console.log('this is the product TBU', product)
      props.editProduct(product)
  }
  return(
    <div className="product-grid">
      <div className="product-card">
        <div className="col-md-2"></div>
        <div className="col-md-8 single-card">
          <div className="col-md-4 padding">
          <h3>Edit {fetchedProduct.name}</h3>
            <form className='form-group' onSubmit={editProduct}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" name="name" id="name" value={fetchedProduct.name} required/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description" id="description" value={fetchedProduct.description} required/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input className="form-control" name="price" id="price" value={fetchedProduct.price} type="number" required/>
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <button className="form-control" name="photo" id="photo">Upload an image</button>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input className="form-control" name="stock" id="stock" value={fetchedProduct.stock} type="number" required/>
              </div>
              <div className="form-group">
                <label htmlFor="categories">Categories</label>
                <input className="form-control" name="categories" id="categories" value={fetchedProduct.categories}/>
              </div>
              <button type="submit" className="btn btn-primary">Submit new product</button>
            </form>
          </div>
        </div>
	 </div>
    </div>
  )
}

const MapStateToProps = state => ({
  currentUser: state.auth
})
  
const MapDispatchToProps = dispatch => ({
  editProduct: (product) => {
		dispatch(editProduct(product))
  }
})

export default connect(MapStateToProps, MapDispatchToProps)(EditProduct)