type FilterBoundaries = {
  boundMinPrice: number
  boundMaxPrice: number
  boundMinRooms: number
  boundMaxRooms: number
  boundMinFloor: number
  boundMaxFloor: number
  boundMinTotalArea: number
  boundMaxTotalArea: number
};

function findFilterBoundaries(locations: IPropertyForMap[]) {
  const initialValue = {
    boundMinPrice: locations[0].price,
    boundMaxPrice: locations[0].price,
    boundMinRooms: locations[0].numberOfRooms,
    boundMaxRooms: locations[0].numberOfRooms,
    boundMinFloor: locations[0].floor,
    boundMaxFloor: locations[0].floor,
    boundMinTotalArea: locations[0].totalArea,
    boundMaxTotalArea: locations[0].totalArea,
  };

  const boundaries = locations.reduce((accumulator, currentValue) => {
    const boundMinPrice = accumulator.boundMinPrice < currentValue.price ? accumulator.boundMinPrice : currentValue.price;
    const boundMaxPrice = accumulator.boundMaxPrice > currentValue.price ? accumulator.boundMaxPrice : currentValue.price;
    const boundMinRooms = accumulator.boundMinRooms < currentValue.numberOfRooms ? accumulator.boundMinRooms : currentValue.numberOfRooms;
    const boundMaxRooms = accumulator.boundMaxRooms > currentValue.numberOfRooms ? accumulator.boundMaxRooms : currentValue.numberOfRooms;
    const boundMinFloor = accumulator.boundMinFloor < currentValue.floor ? accumulator.boundMinFloor : currentValue.floor;
    const boundMaxFloor = accumulator.boundMaxFloor > currentValue.floor ? accumulator.boundMaxFloor : currentValue.floor;
    const boundMinTotalArea = accumulator.boundMinTotalArea < currentValue.totalArea ? accumulator.boundMinTotalArea : currentValue.totalArea;
    const boundMaxTotalArea = accumulator.boundMaxTotalArea > currentValue.totalArea ? accumulator.boundMaxTotalArea : currentValue.totalArea;
    return {
      boundMinPrice,
      boundMaxPrice,
      boundMinRooms,
      boundMaxRooms,
      boundMinFloor,
      boundMaxFloor,
      boundMinTotalArea,
      boundMaxTotalArea,
    };
  }, initialValue);
  return boundaries;
}

export default findFilterBoundaries;
