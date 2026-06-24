import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Highlight from './ui/Highlight';

const Highlights = () => {
    return (
        <section id="highlights">
            <div className="container">
                <div className="row">
                    <h2>Why Choose <span className="purple">Movie Library</span></h2>
                    <div className="highlight__wrapper">
                        <Highlight 
                        icon={<FontAwesomeIcon icon="film" />} 
                        title="Huge Catalog" 
                        description="Explore thousands of movies across genres and decades." />
                        <Highlight 
                        icon={<FontAwesomeIcon icon="star" />} 
                        title="Curated Picks" 
                        description="Handpicked featured films and critic favorites." />
                        <Highlight 
                        icon={<FontAwesomeIcon icon="ticket-alt" />} 
                        title="Events" 
                        description="Special screenings and curated collections." />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;