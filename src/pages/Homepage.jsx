import React from "react";
import { useNavigate } from "react-router-dom";
import "../global.scss";

const Homepage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/employeehomepage");
    };
    return (
        <div className="container">
            <div className="hero-section">
                <h1>Welcome to Advent Global Solutions INC</h1>
                <p>
                    At Advent Global, we believe that digital assurance is the
                    foundation of this transformation.
                </p>
            </div>
            <div className="content-section">
                <div className="sidebar">
                    <h3>Navigation</h3>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/MyTasks">My Tasks</a>
                        </li>
                    </ul>
                    <h3>Projects</h3>
                    <ul>
                        <li>
                            <a href="/unity">Unity</a>
                        </li>
                        <li>
                            <a href="/SNR">SNR</a>
                        </li>
                        <li>
                            <a href="/heart beat">Heart Beat</a>
                        </li>
                    </ul>
                </div>
                <div className="main-content">
                    <div className="cta-card">
                        <h2>Add Tasks</h2>
                        <button onClick={handleRedirect}>
                            Click Here to Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
