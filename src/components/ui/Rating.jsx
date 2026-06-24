import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Rating = ({ rating }) => {
    // Accept string or number; OMDB provides imdbRating out of 10 as a string
    const r = parseFloat(rating);
    const outOfFive = Number.isFinite(r) ? (r / 10) * 5 : 0;
    const full = Math.floor(outOfFive);
    const half = outOfFive - full >= 0.5;

    return (
        <div className="movie__ratings">
            { new Array(full).fill(0).map((_, i) => (
                <FontAwesomeIcon icon="star" className="star" key={i} />
            )) }
            { half && <FontAwesomeIcon icon="star-half-alt" className="star-half" /> }
            <span className="movie__rating--text">{Number.isFinite(r) ? r.toFixed(1) : 'N/A'}</span>
        </div>
    );
}

export default Rating