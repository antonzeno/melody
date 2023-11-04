import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

const Artists = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
                if (response.status === 200) {
                    setUsers(response.data);
                }
            } catch (error) {
                setError(error);
            }
        })();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {error ??
                    users.map((user) => (
                        <div key={user.id} className="col-12 col-md-3">
                            <Link to={`/artists/${user.id}`}>
                                <ArtistCard artist={user} />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Artists;
