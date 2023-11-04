import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="homepage">
            <div
                className="banner d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#1b1b1b", height: 500 }}
            >
                <div className="container d-flex justify-content-center align-items-center flex-column">
                    <div className="text-center mb-2">
                        <h1>Embrace the Rhythm of Creativity. Share Your Sound, Find Your Audience.</h1>
                    </div>
                    <Link to="/artists" className="btn btn-info rounded-pill px-3">
                        Find more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
