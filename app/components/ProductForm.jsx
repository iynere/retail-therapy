import React from 'react'

export default function ProductForm(props){
  console.log('props in product form is', props)
  return(
    <div className="product-grid">
      <div className="product-card">
        <div className="col-md-2"></div>
        <div className="col-md-8 single-card">
          <div className="col-md-4 padding">
          <h3>Add a new product</h3>
            <form className='form-group' onSubmit={props.addProduct}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" name="name" id="name" placeholder="Awesome emotion" required/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description" id="description" placeholder="Product description" required/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input className="form-control" name="price" id="price" placeholder="$0.00" type="number" required/>
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <button className="form-control" name="photo" id="photo">Upload an image</button>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input className="form-control" name="stock" id="stock" placeholder="0" type="number" required/>
              </div>
              <div className="form-group">
                <label htmlFor="categories">Categories</label>
                <input className="form-control" name="categories" id="categories" placeholder="Raw, unexpected"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit new product</button>
            </form>
          </div>
        </div>
	 </div>
    </div>
  )
}