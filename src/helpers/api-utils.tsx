// import listings from '@/mockData';
import path from 'path';
import { promises as fs } from 'fs';

async function readListingsFromFile(): Promise<IPropertyListing[]> {
  let listings: IPropertyListing[] = [];
  const jsonDirectory = process.cwd();
  listings = await fs.readFile(`${jsonDirectory}/listings.json`, 'utf8').then((content) => JSON.parse(content));
  // listings = await fetch('./listings.json')
  //  .then((response) => response.json());
  // console.log(listings);
  return listings;
}

export async function getAllProperties(): Promise<IPropertyListing[]> {
  const listings = await readListingsFromFile();
  return listings;
}

export async function getPropertyById(propertyId: string): Promise<IPropertyListing | undefined> {
  const listings = await readListingsFromFile();
  const property = listings.find((p) => p.id === propertyId);
  return property;
}

export async function getAllPropertiesForMap(): Promise<IPropertyForMap[]> {
  let locations: IPropertyForMap[] = [];
  const listings = await readListingsFromFile();
  locations = listings.map((listing) => ({
    id: listing.id,
    price: listing.priceUSD,
    location: listing.location,
    numberOfRooms: listing.numberOfRooms,
    totalArea: listing.totalArea,
    floor: listing.floor,
  }));
  return locations;
}
