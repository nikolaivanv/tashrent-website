import React, { useState, useCallback } from 'react';
// import RangeInputSlider from '../ui/rangeInputSlider/RangeInputSlider';
import RangeInput from '../ui/rangeInput/RangeInput';
import { Button, buttonVariants } from '../ui/button/Button';

type Props = {
  filterState: FilterState
  onFilter: (filterState: FilterState) => void,
};

function FiltersForm(props: Props) {
  const { filterState, onFilter } = props;
  const {
    currentMinPrice, currentMaxPrice, boundMinPrice, boundMaxPrice,
  } = filterState;

  const [newFilterState, setNewFilterState] = useState(filterState);

  const handleApplyFilter = () => {
    onFilter(newFilterState);
  };

  const handlePriceRangeChange = (newMinValue: number, newMaxValue: number) => {
    setNewFilterState((s) => ({
      ...s,
      currentMinPrice: newMinValue,
      currentMaxPrice: newMaxValue,
    }));
  };

  return (
    <>
      <RangeInput
        name="Price"
        boundMinValue={newFilterState.boundMinPrice}
        boundMaxValue={newFilterState.boundMaxPrice}
        currentMinValue={newFilterState.currentMinPrice}
        currentMaxValue={newFilterState.currentMaxPrice}
        onChange={handlePriceRangeChange}
        onBlur={handleApplyFilter}
      />
      <Button variant="default" onClick={handleApplyFilter}>Apply</Button>
    </>
  );
}

export default FiltersForm;
