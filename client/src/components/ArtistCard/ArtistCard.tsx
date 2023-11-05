import React from "react";
import "./ArtistCard.css";
import { Link } from "react-router-dom";

const ArtistCard = ({ artist }) => {
    return (
        <Link to={`/artists/${artist.id}`}>
            <div
                className="artist-img"
                style={{
                    backgroundImage: `url(${artist.photo ? artist.photo : "/no-img-artist.jpg"})`,
                }}
            >
                <div className="artist-info">{artist.name}</div>
            </div>
        </Link>
    );
};

export default ArtistCard;
