import React from 'react';
import LocationFiltersPanel from './FiltersForm';
import Drawer from '../ui/drawer/Drawer';

type Props = {
  filterState: FilterState
  onFilter: (filterState: FilterState) => void,
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
};

function LocationFiltersDrawer(props: Props) {
  const {
    filterState, onFilter, isOpen, setIsOpen,
  } = props;

  return (
    <Drawer title="Filters" isOpen={isOpen} setIsOpen={setIsOpen}>
      <LocationFiltersPanel filterState={filterState} onFilter={onFilter} />
    </Drawer>
  );
}

export default LocationFiltersDrawer;