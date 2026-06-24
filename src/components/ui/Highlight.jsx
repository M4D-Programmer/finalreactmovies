import React from "react";

const Highlight = ({ icon, title, description }) => {
    return (
        <div className="highlight">
            <div className="highlight__img">
                {icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    
);
};

export default Highlight;