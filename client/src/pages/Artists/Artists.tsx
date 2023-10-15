import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Artists = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
                if (response.status == 200) {
                    setUsers(response.data);
                }
            } catch (error) {
                setError(error)
            }
        })();

    }, [users])

    return (
        <div className="container">
            {error ?? users.map(user =>
                <div key={user.id}>
                    <Link to={`/artists/${user.id}`}>
                        {user.name}
                    </Link>
                </div>

            )}
        </div>
    )
}

export default Artists