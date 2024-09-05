import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    const getProductDetails = useCallback(async () => {
        let result = await fetch(`http://localhost:5707/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }, [params]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails, params]);

    const updateProduct = async () => {
        await fetch(`http://localhost:5707/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        navigate('/');
    };

    return (
        <div className="product-update-container">
            <h1 className="page-title">Update Product</h1>
            <input
                type="text"
                placeholder="Enter product name"
                className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter product price"
                className="input-box"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter product category"
                className="input-box"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter product company"
                className="input-box"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <button onClick={updateProduct} className="update-button">
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;
