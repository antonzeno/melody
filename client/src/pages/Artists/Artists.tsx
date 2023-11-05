import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";

const Artists = () => {
    const debouncedSearch = useRef(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(null);
    const [filters, setFilters] = useState({
        orderBy: "",
    });

    useEffect(() => {
        debouncedSearch.current = debounce(performSearch, 500);
    }, []);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const performSearch = async (query, filters) => {
        try {
            let filterQuery = "";
            if (query) {
                filterQuery += `query=${encodeURIComponent(query)}`;
            }

            for (const key in filters) {
                if (filters[key]) {
                    if (filterQuery.length > 0) {
                        filterQuery += "&";
                    }
                    filterQuery += `${key}=${encodeURIComponent(filters[key])}`;
                }
            }

            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/users${filterQuery ? `?${filterQuery}` : ""}`
            );

            if (response.status === 200) {
                setUsers(response.data);
                setError(null); // Reset error state on successful response
            }
        } catch (error) {
            setError(error.response?.data?.error || "An error occurred"); // Set error message
        }
    };

    useEffect(() => {
        if (query !== null) {
            const search = debouncedSearch.current;
            search(query, filters);
            return () => clearTimeout(search);
        } else {
            performSearch(query, filters);
        }
    }, [query, filters]);

    const handleFilterChange = (type) => (value) => {
        setFilters((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    return (
        <div className="container">
            <div className="row my-5">
                <div className="app-form">
                    <input
                        type="text"
                        placeholder="Search for artist..."
                        className="form-input w-100"
                        value={query} // Add this line to bind the input to the query state
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="search-filters d-flex justify-content-end">
                    <DropdownFilter type="orderBy" onFilterChange={handleFilterChange("orderBy")} />
                </div>
            </div>
            <div className="row">
                {error !== null ? (
                    <div className="d-flex justify-content-center align-items-center">
                        {typeof error === "string" ? error : "An error occurred"}
                    </div>
                ) : users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="col-12 col-md-3 my-2">
                            <ArtistCard artist={user} />
                        </div>
                    ))
                ) : (
                    <div className="d-flex justify-content-center align-items-center">No results for your search.</div>
                )}
            </div>
        </div>
    );
};

export default Artists;
