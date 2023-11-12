import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import filterProperties from '@/utils/filterProperties';
import findFilterBoundaries from '@/utils/findFilterBoundaries';

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
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<string | undefined>();
  const [propertyDetailsIsOpen, setPropertyDetailsIsOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    boundMinPrice: undefined,
    boundMaxPrice: undefined,
    boundMinRooms: undefined,
    boundMaxRooms: undefined,
    boundMinFloor: undefined,
    boundMaxFloor: undefined,
    boundMinTotalArea: undefined,
    boundMaxTotalArea: undefined,
    currentMinPrice: undefined,
    currentMaxPrice: undefined,
    currentMinRooms: undefined,
    currentMaxRooms: undefined,
    currentMinFloor: undefined,
    currentMaxFloor: undefined,
    currentMinTotalArea: undefined,
    currentMaxTotalArea: undefined,
  });
  const [filtersPanelIsOpen, setFiltersPanelIsOpen] = useState(true);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const handleSelectLocations = (propertyId: string) => {
    setHighlightedPropertyId(propertyId);
    setPropertyDetailsIsOpen(true);
  };

  const onShowFiltersButtonClick = () => {
    setFiltersPanelIsOpen(true);
  };

  const handleFilterApply = (newFilterState: FilterState) => {
    setFilterState(newFilterState);
    const newFilteredLocations = filterProperties(locations, newFilterState);
    setFilteredLocations(newFilteredLocations);
    setFiltersPanelIsOpen(false);
  };

  const filterBoundaries = useMemo(
    () => findFilterBoundaries(locations),
    [locations],
  );

  useEffect(() => {
    const newFilterState = {
      ...filterBoundaries,
      currentMinPrice: filterBoundaries.boundMinPrice,
      currentMaxPrice: filterBoundaries.boundMaxPrice,
      currentMinRooms: filterBoundaries.boundMinRooms,
      currentMaxRooms: filterBoundaries.boundMaxRooms,
      currentMinFloor: filterBoundaries.boundMinFloor,
      currentMaxFloor: filterBoundaries.boundMaxFloor,
      currentMinTotalArea: filterBoundaries.boundMinTotalArea,
      currentMaxTotalArea: filterBoundaries.boundMaxTotalArea,
    };
    setFilterState(newFilterState);
  }, [filterBoundaries]);

  const handleResetFilters = useCallback(() => {
    const newFilterState = {
      ...filterBoundaries,
      currentMinPrice: filterBoundaries.boundMinPrice,
      currentMaxPrice: filterBoundaries.boundMaxPrice,
      currentMinRooms: filterBoundaries.boundMinRooms,
      currentMaxRooms: filterBoundaries.boundMaxRooms,
      currentMinFloor: filterBoundaries.boundMinFloor,
      currentMaxFloor: filterBoundaries.boundMaxFloor,
      currentMinTotalArea: filterBoundaries.boundMinTotalArea,
      currentMaxTotalArea: filterBoundaries.boundMaxTotalArea,
    };
    console.log(newFilterState);
    setFilterState(newFilterState);
  }, [filterBoundaries]);
  console.log('MapSearch');
  console.log(filterState);

  return (
    <div>
      <div className="absolute z-10 right-10 top-10">
        <Button variant="default" size="lg" onClick={onShowFiltersButtonClick}>Фильтры</Button>
      </div>
      <LocationFiltersDrawer isOpen={filtersPanelIsOpen} setIsOpen={setFiltersPanelIsOpen} filterState={filterState} onFilter={handleFilterApply} onResetFilters={handleResetFilters} />
      <PropertyDetailsDrawer propertyId={highlightedPropertyId} isOpen={propertyDetailsIsOpen} setIsOpen={setPropertyDetailsIsOpen} />
      <Map locations={filteredLocations} onSelectLocations={handleSelectLocations} />
    </div>
  );
}

export default MapSearch;
