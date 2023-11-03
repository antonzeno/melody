import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cachedArtists } from "../../atoms/artists";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

interface Artist {
    id: number;
    name: string;
    email: string;
    photo: string;
}

interface Soundtrack {
    id: number;
    title: string;
    url: string;
}

const Artist = () => {
    const { id } = useParams();
    const [visitedArtists, setVisitedArtists] = useRecoilState(cachedArtists);
    const [artist, setArtist] = useState<Artist | null>(
        visitedArtists.filter((a) => a.id == id)[0],
    );
    const [soundtracks, setSoundtracks] = useState<Soundtrack[]>([]);

    useEffect(() => {
        if (visitedArtists.some((el) => el.id == id)) {
            setArtist(visitedArtists.filter((a) => a.id == id)[0]);
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [artistResponse, soundtracksResponse] = await Promise.all([
                axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`),
                axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/soundtracks/user/${id}`,
                ),
            ]);

            if (artistResponse.status === 200) {
                const artistData = artistResponse.data;
                setArtist(artistData);

                if (visitedArtists.some((el) => el.id == id)) {
                    setVisitedArtists((prevCachedArtists) =>
                        prevCachedArtists.map((el) =>
                            el.id == id ? artistData : el,
                        ),
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
        <div className="container bg-dark shadow shadow-md w-50 p-3">
            <div className="row">
                <div className="position-relative">
                    <img
                        src={artist.photo}
                        alt={artist.name}
                        className="w-100"
                    />

                    <h1 className="h2">{artist.name}</h1>
                    {soundtracks.length > 0 ? (
                        <ul>
                            {soundtracks.map((track) => {
                                return (
                                    <li
                                        key={track.id}
                                        className="soundtrack-item"
                                    >
                                        <AudioPlayer
                                            trackId={track.id}
                                            streamUrl={track.url}
                                            trackTitle={track.title}
                                            preloadType="audio"
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No soundtracks found.</p>
                    )}

                    <div
                        className="position-absolute"
                        style={{ top: ".5rem", right: "1rem" }}
                    >
                        <Link
                            state={{ artist }}
                            to={"/checkout"}
                            className="btn btn-success"
                        >
                            Buy playlist
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Artist;
