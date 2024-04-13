import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import filterProperties from '@/utils/filterProperties';
import findFilterBoundaries from '@/utils/findFilterBoundaries';
import { useRouter } from 'next/router';
import { Button } from '../ui/button/Button';
import Map from '../map/Map';
import PropertyDetailsDrawer from '../propertyDetails/PropertyDetailsDrawer';
import LocationFiltersDrawer from '../locationFilters/LocationFiltersDrawer';
import { Toaster } from '../ui/toast/Toaster';
import BookmarksDrawer from '../bookmarks/BookmarksDrawer';

type Props = {
  locations: IPropertyForMap[]
};

function MapSearch(props: Props) {
  //console.log('Render: MapSearch');

  const { locations } = props;
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<string | undefined>();
  const [propertyDetailsIsOpen, setPropertyDetailsIsOpen] = useState(false);
  const [bookmarksIsOpen, setBookmarksIsOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    // boundMinPrice: undefined,
    // boundMaxPrice: undefined,
    // boundMinRooms: undefined,
    // boundMaxRooms: undefined,
    // boundMinFloor: undefined,
    // boundMaxFloor: undefined,
    // boundMinTotalArea: undefined,
    // boundMaxTotalArea: undefined,
    currentMinPrice: undefined,
    currentMaxPrice: undefined,
    currentMinRooms: undefined,
    currentMaxRooms: undefined,
    currentMinFloor: undefined,
    currentMaxFloor: undefined,
    currentMinTotalArea: undefined,
    currentMaxTotalArea: undefined,
  });
  const [filtersPanelIsOpen, setFiltersPanelIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [savedPropertiesIds, setSavedPropertiesIds] = useState<string[]>([]);
  const router = useRouter();

  const handleSelectLocations = (propertyId: string) => {
    setHighlightedPropertyId(propertyId);
    setPropertyDetailsIsOpen(true);
    setBookmarksIsOpen(false);
    router.push(`/?propertyId=${propertyId}`);
  };

  const onShowFiltersButtonClick = () => {
    setFiltersPanelIsOpen(true);
  };

  const onShowBookmarksButtonClick = () => {
    setBookmarksIsOpen(true);
  };

  const onNavigateToProperty = (propertyId: string) => {
    setHighlightedPropertyId(propertyId);
    setPropertyDetailsIsOpen(true);
    setBookmarksIsOpen(false);
    router.push(`/?propertyId=${propertyId}`);
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

  useEffect(() => {
    // const getSavedPropertiesFromLocalStorage = () => {
    //   console.log('getSavedPropertiesFromLocalStorage');
    //   const savedPropertiesString = localStorage.getItem('savedProperties');
    //   if (savedPropertiesString) {
    //     setSavedPropertiesIds(JSON.parse(savedPropertiesString) as string[]);
    //   }
    // };
    // getSavedPropertiesFromLocalStorage();
    // window.addEventListener('storage', getSavedPropertiesFromLocalStorage);
    // return () => {
    //   window.removeEventListener('storage', getSavedPropertiesFromLocalStorage);
    // };
    const savedPropertiesString = localStorage.getItem('savedProperties');
    if (savedPropertiesString) {
      setSavedPropertiesIds(JSON.parse(savedPropertiesString) as string[]);
    }
  }, []);

  const onRemoveSavedProperty = (propertyId: string) => {
    const newSavedPropertiesIds = savedPropertiesIds.filter((id) => id !== propertyId);
    setSavedPropertiesIds(newSavedPropertiesIds);
    localStorage.setItem('savedProperties', JSON.stringify(newSavedPropertiesIds));
  };

  const onAddSavedProperty = (propertyId: string) => {
    if (!savedPropertiesIds.includes(propertyId)) {
      const newSavedPropertiesIds = [...savedPropertiesIds, propertyId];
      setSavedPropertiesIds(newSavedPropertiesIds);
      localStorage.setItem('savedProperties', JSON.stringify(newSavedPropertiesIds));
    }
  };

  const onToggleSave = (propertyId: string) => {
    if (savedPropertiesIds.includes(propertyId)) {
      onRemoveSavedProperty(propertyId);
    } else {
      onAddSavedProperty(propertyId);
    }
  };

  const isPropertySaved = (propertyId: string) => savedPropertiesIds.includes(propertyId);

  useEffect(() => {
    const { propertyId } = router.query;
    if (propertyId) {
      setHighlightedPropertyId(propertyId as string);
      setPropertyDetailsIsOpen(true);
    }
  }, [router.query]);

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
    setFilterState(newFilterState);
  }, [filterBoundaries]);

  return (
    <div className="overflow-x-hidden">
      <div className="absolute z-10 right-10 top-10">
        <div className="flex flex-col space-y-2">
          <Button variant="default" size="lg" onClick={onShowFiltersButtonClick}>Фильтры</Button>
          <Button variant="default" size="lg" onClick={onShowBookmarksButtonClick}>Сохраненные</Button>
        </div>
      </div>
      <BookmarksDrawer
        isOpen={bookmarksIsOpen}
        setIsOpen={setBookmarksIsOpen}
        onNavigateToProperty={onNavigateToProperty}
        savedPropertiesIds={savedPropertiesIds}
        onToggleSave={onToggleSave}
      />
      <LocationFiltersDrawer
        isOpen={filtersPanelIsOpen}
        setIsOpen={setFiltersPanelIsOpen}
        filterState={filterState}
        onFilter={handleFilterApply}
        onResetFilters={handleResetFilters}
      />
      {highlightedPropertyId && (
      <PropertyDetailsDrawer
        propertyId={highlightedPropertyId}
        isOpen={propertyDetailsIsOpen}
        setIsOpen={setPropertyDetailsIsOpen}
        isPropertySaved={isPropertySaved(highlightedPropertyId as string)}
        onToggleSave={onToggleSave}
      />
      )}
      <Map
        locations={filteredLocations}
        onSelectLocations={handleSelectLocations}
        highlightedPropertyId={highlightedPropertyId}
      />
      <Toaster />
    </div>
  );
}

export default MapSearch;
