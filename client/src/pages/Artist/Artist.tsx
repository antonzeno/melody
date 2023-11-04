import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cachedArtists } from "../../atoms/artists";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaLock } from "react-icons/fa";

interface ArtistData {
    id: number;
    name: string;
    email: string;
    photo: string;
    orders: number;
}

interface Soundtrack {
    id: number;
    title: string;
    url: string;
}

const Artist = () => {
    const { id } = useParams();
    const [visitedArtists, setVisitedArtists] = useRecoilState(cachedArtists);
    const [artist, setArtist] = useState<ArtistData | null>(visitedArtists.filter((a) => a.id == id)[0]);
    const [soundtracks, setSoundtracks] = useState<Soundtrack[]>([]);

    useEffect(() => {
        if (visitedArtists.some((el) => el.id == id)) {
            setArtist(visitedArtists.filter((a) => a.id == id)[0]);
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            axios.interceptors.request.use(
                (config) => {
                    config.withCredentials = true;
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            const [artistResponse, soundtracksResponse] = await Promise.all([
                axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`),
                axios.get(`${process.env.REACT_APP_SERVER_URL}/soundtracks/user/${id}`),
            ]);

            if (artistResponse.status === 200) {
                const artistData = artistResponse.data;
                setArtist(artistData);

                if (visitedArtists.some((el) => el.id == id)) {
                    setVisitedArtists((prevCachedArtists) =>
                        prevCachedArtists.map((el) => (el.id == id ? artistData : el))
                    );
                } else {
                    setVisitedArtists([...visitedArtists, artistData]);
                }
            }

            if (soundtracksResponse.status === 200) {
                setSoundtracks(soundtracksResponse.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!artist) {
        return <div>Loading....</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5 position-relative">
            <div
                className={`artist-profile-img d col-10 col-md-6 ${artist.orders === 0 ? "dark-overlay" : ""}`}
                style={{ background: `url(${artist.photo ? artist.photo : "/no-img-artist.jpg"})` }}
            >
                {artist.orders === 0 && (
                    <div className="unlock-content d-flex justify-content-center align-items-center flex-column">
                        <FaLock size={"42"} />
                        <div className="unlock-text">
                            <span>Unlock content to access this album</span>
                        </div>
                        <Link state={{ artist }} to={"/checkout"} className="btn btn-sm btn-outline-dark text-light">
                            Buy now
                        </Link>
                    </div>
                )}
                {/* <div className="artist-info">{artist.name}</div> */}
            </div>
        </div>
    );
};

export default Artist;
