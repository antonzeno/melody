import React from "react";
import "./ArtistCard.css";

const ArtistCard = ({ artist }) => {
    return (
        <div
            className="artist-img"
            style={{
                backgroundImage: `url(${artist.photo ? artist.photo : "/no-img-artist.jpg"})`,
            }}
        >
            <div className="artist-info">{artist.name}</div>
        </div>
    );
};

export default ArtistCard;
