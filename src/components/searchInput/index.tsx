import React from "react";

interface SearchInputProps {
    searchTerm: string;
    handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    searchTerm,
    handleSearchTermChange,
}) => {
    return (
        <div>
            Search product by title:
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search products"
            />
        </div>
    );
};

export default SearchInput;
