import React, { useState } from "react";
import { useSelector } from "react-redux";
import { itemsSelector } from "../store/product/productSelector";
import SortingDropdown from "../components/sortingDropdown";
import { Item } from "../types";
import PriceRangeInput from "../components/priceRangeInput";
import SearchInput from "../components/searchInput";

interface SortingOptions {
    sortBy: string;
    sortOrder: string;
}

interface FilteringOptions {
    priceMin: number;
    priceMax: number;
    searchTerm: string;
}

const useSortedProducts = (
    initialSortBy: string,
    initialSortOrder: string,
    initialPriceMin: number,
    initialPriceMax: number,
    initialSearchTerm: string
) => {
    const [sortingOptions, setSortingOptions] = useState<SortingOptions>({
        sortBy: initialSortBy,
        sortOrder: initialSortOrder,
    });
    const [filteringOptions, setFilteringOptions] = useState<FilteringOptions>({
        priceMin: initialPriceMin,
        priceMax: initialPriceMax,
        searchTerm: initialSearchTerm,
    });
    const products = useSelector(itemsSelector);

    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortingOptions({
            ...sortingOptions,
            sortBy: e.target.value,
        });
    };

    const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortingOptions({
            ...sortingOptions,
            sortOrder: e.target.value,
        });
    };

    const handlePriceMinChange = (value: number) => {
        setFilteringOptions({
            ...filteringOptions,
            priceMin: value,
        });
    };

    const handlePriceMaxChange = (value: number) => {
        setFilteringOptions({
            ...filteringOptions,
            priceMax: value,
        });
    };

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilteringOptions({
            ...filteringOptions,
            searchTerm: e.target.value,
        });
    };
    const sortedAndFilteredProducts = products
        .filter((item: Item) => {
            const isInPriceRange =
                item.price >= filteringOptions.priceMin &&
                item.price <= filteringOptions.priceMax;
            const titleIncludesSearchTerm = item.title
                .toLowerCase()
                .includes(filteringOptions.searchTerm.toLowerCase());
            return isInPriceRange && titleIncludesSearchTerm;
        })
        .sort((a: Item, b: Item) => {
            if (sortingOptions.sortBy === "price") {
                if (sortingOptions.sortOrder === "asc") {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            } else if (sortingOptions.sortBy === "title") {
                if (sortingOptions.sortOrder === "asc") {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            }
            return 0;
        });
    return {
        sortedAndFilteredProducts,
        SortingDropdown: (
            <SortingDropdown
                sortBy={sortingOptions.sortBy}
                sortOrder={sortingOptions.sortOrder}
                onSortByChange={handleSortByChange}
                onSortOrderChange={handleSortOrderChange}
            />
        ),
        PriceRangeInput: (
            <PriceRangeInput
                priceMin={filteringOptions.priceMin}
                priceMax={filteringOptions.priceMax}
                onPriceMinChange={handlePriceMinChange}
                onPriceMaxChange={handlePriceMaxChange}
            />
        ),
        SearchInput: (
            <SearchInput
                searchTerm={filteringOptions.searchTerm}
                handleSearchTermChange={handleSearchTermChange}
            />
        ),
    };
};

export default useSortedProducts;
