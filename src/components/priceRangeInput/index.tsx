import React from "react";

interface PriceRangeInputProps {
    priceMin: number;
    priceMax: number;
    onPriceMinChange: (value: number) => void;
    onPriceMaxChange: (value: number) => void;
}

const PriceRangeInput: React.FC<PriceRangeInputProps> = ({
    priceMin,
    priceMax,
    onPriceMinChange,
    onPriceMaxChange,
}) => {
    return (
        <div>
            Filter in price range:
            <label htmlFor="priceMin">Price Min:</label>
            <input
                type="number"
                id="priceMin"
                min={0}
                max={1000}
                value={priceMin}
                onChange={(e) => onPriceMinChange(parseInt(e.target.value))}
            />
            <label htmlFor="priceMax">Price Max:</label>
            <input
                type="number"
                id="priceMax"
                min={0}
                value={priceMax}
                onChange={(e) => onPriceMaxChange(parseInt(e.target.value))}
            />
        </div>
    );
};

export default PriceRangeInput;
