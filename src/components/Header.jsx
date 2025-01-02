// import React from "react";
// import "../global.scss";

// const Header = () => {
//     return (
//         <div className="navbar">
//             <div className="logo">
//                 <a href="/">Home</a>
//             </div>
//             <div className="nav-links">
//                 <a href="/about">About</a>
//                 <a href="/contact">Contact</a>
//                 <a href="/login">Login</a>
//                 <a href="/register">Register</a>
//             </div>
//         </div>
//     );
// };

// export default Header;

import React from "react";
import "../global.scss";

const Header = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <a href="/">
                    <img
                        src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/49f24c94b49d5a415a07384302297cb1"
                        alt="home_pic"
                    />
                </a>
            </div>
            <div className="nav-links">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </div>
    );
};

export default Header;
