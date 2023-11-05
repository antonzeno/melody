import React, { useState } from "react";

const DropdownFilter = ({ type, onFilterChange }) => {
    const [filter, setFilter] = useState("");
    let name;

    switch (type) {
        case "orderBy":
            name = "Order by";
            break;
    }

    const handleChangeFilter = (e) => {
        const selectedValue = e.target.value;
        setFilter(selectedValue);
        onFilterChange(selectedValue);
    };

    return (
        <div>
            <select
                className="btn btn-outline-dark text-light text-start"
                style={{ border: "none" }}
                name={type}
                value={filter}
                onChange={handleChangeFilter}
            >
                <option value="">{name}</option>
                <option value="name_asc">Name asc</option>
                <option value="name_desc">Name desc</option>
            </select>
        </div>
    );
};

export default DropdownFilter;
