import React from "react";

interface SortingDropdownProps {
    sortBy: string;
    sortOrder: string;
    onSortByChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortingDropdown: React.FC<SortingDropdownProps> = ({
    sortBy,
    sortOrder,
    onSortByChange,
    onSortOrderChange,
}) => {
    return (
        <div>
            <label htmlFor="sortBy">Sort By:</label>
            <select id="sortBy" value={sortBy} onChange={onSortByChange}>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
            </select>
            <select value={sortOrder} onChange={onSortOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
};

export default SortingDropdown;
