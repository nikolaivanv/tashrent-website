import React, { useState, useCallback } from 'react';
// import RangeInputSlider from '../ui/rangeInputSlider/RangeInputSlider';
import RangeInput from '../ui/rangeInput/RangeInput';
import Button from '../ui/button/Button';

type Props = {
  filterState: FilterState
  onFilter: (filterState: FilterState) => void,
};

function LocationFiltersPanel(props: Props) {
  const { filterState, onFilter } = props;
  const {
    currentMinPrice, currentMaxPrice, boundMinPrice, boundMaxPrice,
  } = filterState;

  const [newFilterState, setNewFilterState] = useState(filterState);

  const handleSubmit = useCallback(
    () => (event) => {
      event.preventDefault();
      const newFilterState = {
        ...filterState,
        currentMinPrice,
        currentMaxPrice,
      };
      onFilter(newFilterState);
    },
    [filterState, onFilter],
  );

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const formJson = Object.fromEntries(formData.entries());

  //   const newFilterState = {
  //     ...filterState,
  //     currentMinPrice: formJson.price_min,
  //     currentMaxPrice: formJson.price_max,
  //   };
  //   onFilter(newFilterState);
  // };
  return (
    <form method="post" onSubmit={handleSubmit()}>
      <RangeInput
        name="Price"
        boundMinValue={newFilterState.boundMinPrice}
        boundMaxValue={newFilterState.boundMaxPrice}
        currentMinValue={newFilterState.currentMinPrice}
        currentMaxValue={newFilterState.currentMaxPrice}
      />
      <Button primary text="Apply" />
    </form>
  );

  // const { filterState, onFilter } = props;
  // const {
  //   boundMinPrice, boundMaxPrice, currentMinPrice, currentMaxPrice,
  // } = filterState;

  // const handlePriceRangeChange = (newValue: number | number[], index: number) => {
  //   const newFilterState = {
  //     ...filterState,
  //     currentMinPrice: newValue[0],
  //     currentMaxPrice: newValue[1],
  //   };
  //   onFilter(newFilterState);
  // };

  // return (
  //   <div className="w-30">
  //     <RangeInputSlider className="w-40 h-8" defaultValue={[currentMinPrice, currentMaxPrice]} onChange={handlePriceRangeChange} min={boundMinPrice} max={boundMaxPrice} />
  //   </div>
  // );
}

export default LocationFiltersPanel;
