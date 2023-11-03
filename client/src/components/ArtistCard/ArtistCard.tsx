import React from "react";
import "./ArtistCard.css";

const ArtistCard = ({ artist }) => {
    return (
        <div className="artist-card">
            <img src={artist.photo} alt="img" />
            <div className="p-2 text-center text-decoration-none">
                {artist.name}
            </div>
        </div>
    );
};

export default ArtistCard;
