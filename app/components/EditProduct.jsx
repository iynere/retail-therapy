import React from 'react'
import {connect} from 'react-redux'
import {editProduct, deleteProduct} from 'APP/app/reducers/product'
import {Link, browserHistory} from 'react-router'

export const EditProduct = ({product, editProduct}) => {
  console.log('edit product is getting', product)
  var onEditProduct = function(evt){
      evt.preventDefault()
      const productToSend = {
          id: product.id,
          name: evt.target.name.value,
          description: evt.target.description.value,
          price: +evt.target.price.value * 100,
          photoUrl: evt.target.photo.value,
          stock: +evt.target.stock.value
      }
      console.log('this is the product TBU', product)
      editProduct(productToSend, product.id)
      browserHistory.push('/admin/manageProducts')
  }
  return(
    <div className="product-grid">
      <div className="product-card">
        <div className="col-md-2"></div>
        <div className="col-md-8 single-card">
          <div className="col-md-4 padding">
          <h3>Edit {product.name}</h3>
            <form className='form-group' onSubmit={onEditProduct}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" name="name" id="name" defaultValue={product.name} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description" id="description" defaultValue={product.description} required/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input className="form-control" name="price" id="price" defaultValue={+(product.price).slice(1)} type="number" required/>
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <button className="form-control" name="photo" id="photo">{product.photoUrl}</button>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input className="form-control" name="stock" id="stock" defaultValue={product.stock} type="number" required/>
              </div>
              <div className="form-group">
                <label htmlFor="categories">Categories</label>
                <input className="form-control" name="categories" id="categories" defaultValue={product.categories}/>
              </div>
              <div className="same-line">
                <button type="submit" className="btn btn-primary left">Submit changes</button>
                <button className="btn btn-default right" onClick="">
                  <span className="glyphicon glyphicon-trash" aria-label="Delete"></span>
                </button>
                <div className="clearfix"></div>
              </div>
            </form>
          </div>
        </div>
	 </div>
    </div>
  )
}

const MapStateToProps = state => ({
  product: state.product
})
  
const MapDispatchToProps = dispatch => ({
  editProduct: (product, id) => {
    dispatch(editProduct(product, id))
  }
})

export default connect(MapStateToProps, MapDispatchToProps)(EditProduct)