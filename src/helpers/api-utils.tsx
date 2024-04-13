// import listings from '@/mockData';
// import path from 'path';
import AWS from 'aws-sdk';
// import { promises as fs } from 'fs';

// async function readListingsFromFile(): Promise<IPropertyListing[]> {
//   let listings: IPropertyListing[] = [];
//   const jsonDirectory = process.cwd();
//   listings = await fs.readFile(`${jsonDirectory}/listings.json`, 'utf8').then((content) => JSON.parse(content));
//   // listings = await fetch('./listings.json')
//   //  .then((response) => response.json());
//   // console.log(listings);
//   return listings;
// }

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const s3 = new AWS.S3();

async function readListingsFromS3(): Promise<IPropertyListing[]> {
  //let listings: IPropertyListing[] = [];
  // const params = {
  //   Bucket: process.env.AWS_S3_BUCKET,
  //   Key: process.env.AWS_S3_KEY,
  // };

  try {
    console.log('Downloading all listings from S3');
    // const data = await s3.getObject(params).promise();
    const listings = await fetch('https://dfkg1j9k2eshd.cloudfront.net/listings.json').then((response) => response.json());
    //console.log('data: ', data);
    // const data = fetch('https://tashrent.s3.us-east-2.amazonaws.com/listings.json').then((response) => response.json());
    //listings = JSON.parse(data.toString());
    return listings;
  } catch (err) {
    return null;
  }
}

async function readListingFromS3(propertyId: string): Promise<IPropertyListing> {
  try {
    console.log('Downloading a single listing from S3');
    // const data = await s3.getObject(params).promise();
    const listing = await fetch(`https://dfkg1j9k2eshd.cloudfront.net/${propertyId}.json`).then((response) => response.json());
    // const data = fetch('https://tashrent.s3.us-east-2.amazonaws.com/listings.json').then((response) => response.json());
    return listing;
  } catch (err) {
    return null;
  }
}

// export async function getAllProperties(): Promise<IPropertyListing[]> {
//   // const listings = await readListingsFromFile();
//   console.log('getAllProperties');
//   const listings = await readListingsFromS3();
//   return listings;
// }

export async function getPropertyById(propertyId: string): Promise<IPropertyListing | undefined> {
  // const listings = await readListingsFromFile();
  console.log('getPropertyById');
  const listing = await readListingFromS3(propertyId);
  //const property = listings.find((p) => p.id === propertyId);
  return listing;
}

export async function getAllPropertiesForMap(): Promise<IPropertyForMap[]> {
  console.log('getAllPropertiesForMap');
  let locations: IPropertyForMap[] = [];
  const listings = await readListingsFromS3();
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
