import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/SignUp');
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img 
                    alt='logo' 
                    className='logo' 
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPE9VD7hC5m5iUcMPpHnJWJj37QdoVWgzLsg&s'
                />
                <span className="brand-name">EC-Commerce</span>
            </div>
            {auth ? (
                <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link onClick={logout} to="/Signup">Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
            ) : (
                <ul className='nav-ul nav-right'>
                    <li><Link to="/SignUp">Sign Up</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
            )}
        </nav>
    );
}

export default Nav;
