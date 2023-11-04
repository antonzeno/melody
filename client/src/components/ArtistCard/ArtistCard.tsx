import React from "react";
import "./ArtistCard.css";

const ArtistCard = ({ artist }) => {
    return (
        <div
            className="banner"
            style={{
                backgroundImage: `url(${artist.photo ? artist.photo : "/no-img-artist.jpg"})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: 300,
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "10px",
                    color: "white",
                    textAlign: "center",
                }}
            >
                {artist.name}
            </div>
        </div>
    );
};

export default ArtistCard;
