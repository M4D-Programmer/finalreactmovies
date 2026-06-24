import React from "react";
// import Logo from "../assets/Library.svg";
import { Link } from 'react-router-dom';

// {Logo}

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row row__column">
                    <Link to="/">
                        <figure className="footer__logo">
                            <img src="" className="footer__logo--img" alt="Library Logo" />
                        </figure>
                    </Link>
                    <div className="footer__list">
                        <Link to="/" className="footer__link">Home</Link>
                        <span className="footer__link">About</span>
                        <Link to="/movies" className="footer__link">Movies</Link>
                        <Link to="/cart" className="footer__link">Cart</Link>
                    </div>
                    <div className="footer__copyright">
                        Copyright &copy; 2026 Movie Library. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;