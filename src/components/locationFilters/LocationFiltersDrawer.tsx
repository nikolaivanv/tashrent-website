import React from 'react';
import FiltersForm from './FiltersForm';
import Drawer from '../ui/drawer/Drawer';

type Props = {
  filterState: FilterState
  onFilter: (filterState: FilterState) => void,
  onResetFilters: () => void,
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
};

function LocationFiltersDrawer(props: Props) {
  const {
    filterState, onFilter, onResetFilters, isOpen, setIsOpen,
  } = props;
  console.log('LocationFiltersDrawer render');
  console.log(filterState);
  return (
    <Drawer title="Фильтры" isOpen={isOpen} setIsOpen={setIsOpen} side="right">
      <FiltersForm filterState={filterState} onFilter={onFilter} onResetFilters={onResetFilters} />
    </Drawer>
  );
}

export default LocationFiltersDrawer;
