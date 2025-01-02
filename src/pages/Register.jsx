import React from "react";
import "./Register.scss";

const Register = () => {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Register</h1>
                <form>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your full name" />
                    </div>
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
