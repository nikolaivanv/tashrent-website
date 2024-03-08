// types/global.d.ts

export {};

declare global {

  interface ILocation {
    lat: number
    lng: number
  }

  interface IPropertyForMap {
    id: string
    price: number
    location: ILocation
    numberOfRooms: number
    totalArea: number
    floor: number
  }

  interface IImage {
    id: string
    url: string
    rotation: number
    width: number
    height: number
  }

  interface IPropertyListing {
    id: string
    title: string,
    location: ILocation
    price: number
    priceUSD: number
    sourceUrl: string,
    photos: IImage[],
    createdAt: string,
    refreshedAt: string,
    description: string,
    district: string,
    numberOfRooms: number,
    totalArea: number,
    floor: number,
    totalFloors: number,
    sourceUrl: string
  }

  interface FilterState {
    boundMinPrice: number
    boundMaxPrice: number
    boundMinRooms: number | undefined
    boundMaxRooms: number | undefined
    boundMinFloor: number | undefined
    boundMaxFloor: number | undefined
    boundMinTotalArea: number | undefined
    boundMaxTotalArea: number | undefined
    currentMinPrice: number | undefined
    currentMaxPrice: number | undefined
    currentMinRooms: number | undefined
    currentMaxRooms: number | undefined
    currentMinFloor: number | undefined
    currentMaxFloor: number | undefined
    currentMinTotalArea: number | undefined
    currentMaxTotalArea: number | undefined
  }
}
