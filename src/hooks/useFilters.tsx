function useFilters(locations: IPropertyForMap[], filterState: FilterState): IPropertyForMap[] {
  const { currentMinPrice, currentMaxPrice } = filterState;
  return locations.filter((location) => (location.price >= currentMinPrice) && (location.price <= currentMaxPrice));
}

export default useFilters;
