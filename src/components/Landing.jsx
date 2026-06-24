import React from "react";
//import UndrawBooks from "../assets/Undraw_Books.svg";
import { Link } from 'react-router-dom';

// {UndrawBooks}

const Landing = () => {
    return (
        <section id="landing">
            <header>
                <div className="header__container">
                    <div className="header__description">
                        <h1>Welcome to the Movie Library</h1>
                        <h2>Discover your next favorite film with <span className="purple">Movie Library</span></h2>
                        <Link to="#features">
                            <button className="btn">Browse Movies</button>
                        </Link>
                    </div>
                    <figure className="header__img--wrapper">
                        <img src="" alt="Movies illustration"/>
                    </figure>
                </div>
            </header>
        </section>
    );
};

export default Landing;