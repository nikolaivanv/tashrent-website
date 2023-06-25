// types/global.d.ts

export {};

declare global {

  interface ICoordinates {
    lat: number
    lng: number
  }

  interface IPropertyListing {
    id: string
    title: string,
    coordinates: ICoordinates
    price: number
  }
}
