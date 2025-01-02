import React from "react";
import "./Login.scss";

const Login = () => {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
