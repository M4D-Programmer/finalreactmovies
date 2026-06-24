import React, { useState, useEffect, useRef } from "react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Rating from './Rating.jsx'

const Book = ({ book }) => {
    // Keep for backwards compatibility but hide price information
    const [img, setImg] = useState();
    const mountedRef = useRef(true);

    useEffect(() => {
        const image = new Image();
        image.src = book.url;
        image.onload = () => {
            setTimeout(() => {
                if (mountedRef.current) setImg(image);
            }, 200);
        };
        return () => { mountedRef.current = false }
    }, [book.url])

    return (
        <div className="book">
            { img ? (
                <>
                <Link to={`/movies/${book.id}`}>
                <figure className="book__img--wrapper">
                    <img src={book.url} alt="Cover"/>
                </figure>
            </Link>
                <div className="book__title">
                <Link to={`/movies/${book.id}`} className="book__title--link">{book.title}</Link>
                </div>
                <Rating rating={book.rating || 0} />
                </>
            ) : (
                <>
                <div className="book__img--skeleton">
                    <div className="skeleton book__title--skeleton"></div>
                    <div className="skeleton book__rating--skeleton"></div>
                </div>
                </>
            )}
        </div>
    );
};

export default Book;