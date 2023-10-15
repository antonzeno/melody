import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { cachedArtists } from '../../atoms/artists';

interface Artist {
    id: number;
    name: string;
    email: string;
}

const Artist = () => {
    const { id } = useParams();
    const [visitedArtists, setVisitedArtists] = useRecoilState(cachedArtists);
    const [artist, setArtist] = useState<Artist | null>(visitedArtists.filter(a => a.id == id)[0]);

    useEffect(() => {
        if (visitedArtists.some(el => el.id == id)) {
            setArtist(visitedArtists.filter(a => a.id == id)[0])
        }

        fetchData()

    }, [])

    const fetchData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`)

        if (response.status === 200) {
            setArtist(response.data);

            if (visitedArtists.some(el => el.id == id)) {
                setVisitedArtists(prevCachedArtists =>
                    prevCachedArtists.map(el => el.id == id ? response.data : el)
                );
            } else {
                setVisitedArtists([...visitedArtists, response.data])
            }
        }
    }

    return (
        <div className='container'>
            {artist ? `Artist ${artist.name}` : 'Loading...'}
        </div>
    )
}

export default Artist