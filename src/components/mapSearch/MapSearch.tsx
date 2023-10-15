import React, { useEffect, useState, useMemo } from 'react';
import useFilters from '@/hooks/useFilters';
import useFindFilterBoundaries from '@/hooks/useFindFilterBoundaries';
import Drawer from '../ui/drawer/Drawer';
import PropertyDetailsCard from '../propertyDetails/PropertyDetailsCard';
import LocationFiltersPanel from '../locationFilters/FiltersForm';
import { Button, buttonVariants } from '../ui/button/Button';
import Map from '../map/Map';
import PropertyDetailsDrawer from '../propertyDetails/propertyDetailsDrawer';
import LocationFiltersDrawer from '../locationFilters/LocationFiltersDrawer';

type Props = {
  locations: IPropertyForMap[]
};

function MapSearch(props: Props) {
  const { locations } = props;
  const [highlighted, setHighlighted] = useState<string | undefined>();
  const [propertyDetailsIsOpen, setPropertyDetailsIsOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    boundMinPrice: 0,
    boundMaxPrice: 10000,
    boundMinRooms: 1,
    boundMaxRooms: 10,
    boundMinFloor: 1,
    boundMaxFloor: 100,
    boundMinTotalArea: 0,
    boundMaxTotalArea: 1000,
    currentOnlyPreciseLocations: false,
    currentMinPrice: 0,
    currentMaxPrice: 10000,
    currentMinRooms: 1,
    currentMaxRooms: 10,
    currentMinFloor: 1,
    currentMaxFloor: 100,
    currentMinTotalArea: 0,
    currentMaxTotalArea: 1000,
  });
  const [filtersPanelIsOpen, setFiltersPanelIsOpen] = useState(true);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const handleSelectLocations = (propertyId: number) => {
    setHighlighted(propertyId);
    setPropertyDetailsIsOpen(true);
  };

  const onShowFiltersButtonClick = () => {
    setFiltersPanelIsOpen(true);
  };

  const handleFilterStateChange = (newFilterState: FilterState) => {
    setFilterState(newFilterState);
    const newFilteredLocations = useFilters(locations, newFilterState);
    setFilteredLocations(newFilteredLocations);
  };

  useMemo(() => {
    const filterBoundaries = useFindFilterBoundaries(locations);
    const newFilterState = {
      ...filterBoundaries,
      currentOnlyPreciseLocations: false,
      currentMinPrice: filterBoundaries.boundMinPrice,
      currentMaxPrice: filterBoundaries.boundMaxPrice,
      currentMinRooms: filterBoundaries.boundMinRooms,
      currentMaxRooms: filterBoundaries.boundMaxRooms,
      currentMinFloor: filterBoundaries.boundMinFloor,
      currentMaxFloor: filterBoundaries.boundMaxFloor,
      currentMinTotalArea: filterBoundaries.boundMinTotalArea,
      currentMaxTotalArea: filterBoundaries.boundMaxTotalArea,
    };
    // console.log(newFilterState);
    setFilterState(newFilterState);
    // const newFilteredLocations = useFilters(locations, newFilterState);
    // setFilteredLocations(newFilteredLocations);
  }, [locations]);

  // console.log(filterState);

  return (
    <>
      <Button variant="default" onClick={onShowFiltersButtonClick}>Filters</Button>
      <LocationFiltersDrawer isOpen={filtersPanelIsOpen} setIsOpen={setFiltersPanelIsOpen} filterState={filterState} onFilter={handleFilterStateChange} />
      <PropertyDetailsDrawer propertyId={highlighted} isOpen={propertyDetailsIsOpen} setIsOpen={setPropertyDetailsIsOpen} />
      <Map locations={filteredLocations} onSelectLocations={handleSelectLocations} />
    </>
  );
}

export default MapSearch;