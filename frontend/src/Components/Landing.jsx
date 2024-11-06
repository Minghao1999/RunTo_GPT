import React from "react";
import '../UI/Hero.css';
import runto1 from '../../assets/runto.png';
import runto2 from '../../assets/runto2.png';
import runto4 from '../../assets/runto4.png';

const Landing = () => {
    return (
        <div className="hero">
            <h1>Welcome to RunTo GPT</h1>
            <p>Your AI assistance for Cats and Dogs</p>
            {/* Image Collage */}
            <div className="image-collage">
                <img src={runto1} alt="RunTo Image 1" className="collage-image collage-image-1" />
                <img src={runto2} alt="RunTo Image 2" className="collage-image collage-image-2" />
                <img src={runto4} alt="RunTo Image 4" className="collage-image collage-image-4" />
            </div>
        </div>
    );
};

export default Landing;
