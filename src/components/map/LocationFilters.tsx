import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

// type FilterBounds = {
//   priceMin: number,
//   priceMax: number,
//   floorMin: number,
//   floorMax: number,
//   numberOfRoomsMin: number,
//   numberOfRoomsMax: number,
//   areaMin: number,
//   areaMax: number
// };

type Props = {
  onFilter: (minPrice: number, maxPrice: number) => void,
  minPrice: number,
  maxPrice: number
//   onFilter: (filters: FilterBounds) => void,
  //   filterBounds: FilterBounds
};

function LocationFilters(props: Props) {
  // const { filterBounds, onFilter } = props;
  // [currentFilterBounds, setCurrentFilterBounds] = useState<FilterBounds>(filterBounds);
  const { onFilter, minPrice, maxPrice } = props;
  const [priceRange, setPriceRange] = React.useState<number[]>([minPrice, maxPrice]);

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    console.log(newValue);
    onFilter(newValue[0], newValue[1]);
  };

  return (
    <div className="w-30">
      <Slider
        getAriaLabel={() => 'Price'}
        min={minPrice}
        max={maxPrice}
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => `${value[0]} - ${value[1]}`}
      />
    </div>
  );
}

export default LocationFilters;
