import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import LibraryLogo from "../assets/Library.svg";
import { Link } from 'react-router-dom';

// {LibraryLogo}


const Nav = ({ numberOfItems }) => {
    function openMenu() {
        document.body.classList.add("menu--open");
    }
    function closeMenu() {
        document.body.classList.remove("menu--open");
    }
        return (
        <nav>
            <div className="nav__container">
                <Link to="/" onClick={closeMenu}>
                    <img src="" alt="" className="logo" />
                </Link>
                <ul className="nav__links">
                    <li className="nav__list"> 
                        <Link to="/" className="nav__link" onClick={closeMenu}>Home</Link>
                    </li>
                    <li className="nav__list">
                        <Link to="/movies" className="nav__link" onClick={closeMenu}>Movies</Link>
                    </li>
                    <button className="btn__menu" onClick={openMenu}>
                        <FontAwesomeIcon icon="bars" />
                    </button>
                    {/* cart removed for movie app */}
                </ul>
                <div className="menu__backdrop">
                    <button className="btn__menu btn__menu--close" onClick={closeMenu}>
                        <FontAwesomeIcon icon="times" />
                    </button>
                    <ul className="menu__links">
                        <li className="menu__list"> 
                            <Link to="/" className="menu__link" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className="menu__list">
                            <Link to="/movies" className="menu__link" onClick={closeMenu}>Movies</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;