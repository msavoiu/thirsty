import React from "react";
// import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    Thirsty
                </a>
            </div>
            <div className="navbar-right">
                <a href="/account" className="user-icon">
                    <i className="fas fa-user"></i>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;