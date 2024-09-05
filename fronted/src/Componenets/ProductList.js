import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5707/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5707/product/${id}`, {
            method: "DELETE"
        });

        result = await result.json();

        if (result) {
            alert("Record is deleted");
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        const key = event.target.value;

        if (key) {
            let result = await fetch(`http://localhost:5707/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className="product-list-container">
            <h1 className="page-title">Product List</h1>
            <input
                className="search-box"
                type="text"
                placeholder="Search Product..."
                onChange={searchHandle}
            />
            <div className="product-table">
                <ul className="table-header">
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Actions</li>
                </ul>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ul key={item._id} className="table-row">
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>${item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button className="btn-delete" onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link className="btn-update" to={`/update/${item._id}`}>Update</Link>
                            </li>
                        </ul>
                    ))
                ) : (
                    <h2 className="no-products">No Products Found</h2>
                )}
            </div>
        </div>
    );
};

export default ProductList;
