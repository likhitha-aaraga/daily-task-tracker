// import React from "react";
// import "../global.scss";

// const Homepage = () => {
//     return (
//         <div className="container">
//             <div className="hero-section">
//                 <h1>Welcome to Advent Global Solutions INC</h1>
//                 <p>
//                     At Advent Global, we believe that digital assurance is the
//                     foundation of this transformation.
//                 </p>
//             </div>
//             <div className="cta-card">
//                 <h2>My Tasks</h2>
//                 <p>MM-DD-YYYY</p>
//                 <button>Upload</button>
//             </div>
//         </div>
//     );
// };

// export default Homepage;

import React from "react";
import "../global.scss";

const Homepage = () => {
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
                        <li>Inbox</li>
                        <li>Message</li>
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
                    <div className="dashboard-stats">
                        <div>Total Projects: 1</div>
                        <div>Total Tasks: 1</div>
                        <div>Assigned Tasks: 1</div>
                        <div>Completed Tasks: 1</div>
                        <div>Overdue Tasks: 1</div>
                    </div>
                    <div className="tasks-section">
                        <h3>Assigned Tasks</h3>
                        <ul>
                            <li>Assigned task - 1</li>
                            <li>Assigned task - 2</li>
                            <li>Assigned task - 3</li>
                        </ul>
                    </div>
                    <div className="cta-card">
                        <h2>My Tasks</h2>
                        <p>MM-DD-YYYY</p>
                        <button>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
