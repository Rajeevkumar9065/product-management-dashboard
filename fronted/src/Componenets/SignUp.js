import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const collectData = async () => {
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        console.warn(name, email, password);
        let result = await fetch("http://localhost:5707/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();

        if (result.error) {
            setError(result.error);
        } else {
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Register</h1>
                {error && <span className="error-message">{error}</span>}
                <input
                    className="inputBox"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                />
                <input
                    className="inputBox"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                />
                <input
                    className="inputBox"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                />
                <button onClick={collectData} className="appButton" type="button">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;
