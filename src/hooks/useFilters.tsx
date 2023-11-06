function useFilters(locations: IPropertyForMap[], filterState: FilterState): IPropertyForMap[] {
  const {
    currentMinPrice,
    currentMaxPrice,
    currentMinRooms,
    currentMaxRooms,
    currentMinFloor,
    currentMaxFloor,
    currentMinTotalArea,
    currentMaxTotalArea,
  } = filterState;
  return locations.filter((location) => (
    location.price >= currentMinPrice) && (location.price <= currentMaxPrice)
    && (location.numberOfRooms >= currentMinRooms) && (location.numberOfRooms <= currentMaxRooms)
    && (location.totalArea >= currentMinTotalArea) && (location.totalArea <= currentMaxTotalArea)
    && (location.floor >= currentMinFloor) && (location.floor <= currentMaxFloor));
}

export default useFilters;
