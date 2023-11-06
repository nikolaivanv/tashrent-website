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

  const handleNumberOfRoomsRangeChange = (newMinValue: number, newMaxValue: number) => {
    setNewFilterState((s) => ({
      ...s,
      currentMinRooms: newMinValue,
      currentMaxRooms: newMaxValue,
    }));
  };

  const handleTotalAreaRangeChange = (newMinValue: number, newMaxValue: number) => {
    setNewFilterState((s) => ({
      ...s,
      currentMinTotalArea: newMinValue,
      currentMaxTotalArea: newMaxValue,
    }));
  };

  const handleFloorRangeChange = (newMinValue: number, newMaxValue: number) => {
    setNewFilterState((s) => ({
      ...s,
      currentMinFloor: newMinValue,
      currentMaxFloor: newMaxValue,
    }));
  };

  return (
    <div className="flex flex-col w-screen max-w-lg pl-3 space-y-8 dark:bg-black">
      <div>
        <RangeInput
          name="Цена"
          boundMinValue={newFilterState.boundMinPrice}
          boundMaxValue={newFilterState.boundMaxPrice}
          currentMinValue={newFilterState.currentMinPrice}
          currentMaxValue={newFilterState.currentMaxPrice}
          onChange={handlePriceRangeChange}
          onBlur={handleApplyFilter}
        />
      </div>
      <div>
        <RangeInput
          name="Количество комнат"
          boundMinValue={newFilterState.boundMinRooms}
          boundMaxValue={newFilterState.boundMaxRooms}
          currentMinValue={newFilterState.currentMinRooms}
          currentMaxValue={newFilterState.currentMaxRooms}
          onChange={handleNumberOfRoomsRangeChange}
          onBlur={handleApplyFilter}
        />
      </div>
      <div>
        <RangeInput
          name="Общая площадь"
          boundMinValue={newFilterState.boundMinTotalArea}
          boundMaxValue={newFilterState.boundMaxTotalArea}
          currentMinValue={newFilterState.currentMinTotalArea}
          currentMaxValue={newFilterState.currentMaxTotalArea}
          onChange={handleTotalAreaRangeChange}
          onBlur={handleApplyFilter}
        />
      </div>
      <div>
        <RangeInput
          name="Этаж"
          boundMinValue={newFilterState.boundMinFloor}
          boundMaxValue={newFilterState.boundMaxFloor}
          currentMinValue={newFilterState.currentMinFloor}
          currentMaxValue={newFilterState.currentMaxFloor}
          onChange={handleFloorRangeChange}
          onBlur={handleApplyFilter}
        />
      </div>
      <div>
        <Button variant="default" onClick={handleApplyFilter}>Применить</Button>
      </div>
    </div>
  );
}

export default FiltersForm;
