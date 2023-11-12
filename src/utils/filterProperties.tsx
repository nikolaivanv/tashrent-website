function filterProperties(locations: IPropertyForMap[], filterState: FilterState): IPropertyForMap[] {
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
  return locations.filter((location) => (currentMinPrice == null || location.price >= currentMinPrice)
    && (currentMaxPrice == null || location.price <= currentMaxPrice)
    && (currentMinRooms == null || location.numberOfRooms >= currentMinRooms)
    && (currentMaxRooms == null || location.numberOfRooms <= currentMaxRooms)
    && (currentMinTotalArea == null || location.totalArea >= currentMinTotalArea)
    && (currentMaxTotalArea == null || location.totalArea <= currentMaxTotalArea)
    && (currentMinFloor == null || location.floor >= currentMinFloor)
    && (currentMaxFloor == null || location.floor <= currentMaxFloor));
}

export default filterProperties;
