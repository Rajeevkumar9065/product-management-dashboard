import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5707/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
    }

    return (
        <div className="container my-5">
            <div className="card p-4 shadow-sm custom-card">
                <h1 className="text-center mb-4 gradient-text">Add Product</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input 
                            type="text" 
                            className={`form-control custom-input ${error && !name ? 'is-invalid' : ''}`} 
                            id="productName" 
                            placeholder="Enter product name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        {error && !name && <div className="invalid-feedback">Enter valid name</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                        <input 
                            type="text" 
                            className={`form-control custom-input ${error && !price ? 'is-invalid' : ''}`} 
                            id="productPrice" 
                            placeholder="Enter product price" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                        />
                        {error && !price && <div className="invalid-feedback">Enter valid price</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productCategory" className="form-label">Product Category</label>
                        <input 
                            type="text" 
                            className={`form-control custom-input ${error && !category ? 'is-invalid' : ''}`} 
                            id="productCategory" 
                            placeholder="Enter product category" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                        />
                        {error && !category && <div className="invalid-feedback">Enter valid category</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productCompany" className="form-label">Product Company</label>
                        <input 
                            type="text" 
                            className={`form-control custom-input ${error && !company ? 'is-invalid' : ''}`} 
                            id="productCompany" 
                            placeholder="Enter product company" 
                            value={company} 
                            onChange={(e) => setCompany(e.target.value)} 
                        />
                        {error && !company && <div className="invalid-feedback">Enter valid company</div>}
                    </div>

                    <button 
                        type="button" 
                        className="btn custom-button w-100 mt-3" 
                        onClick={addProduct}
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;
