import React from 'react';
import Head from 'next/head';
import Map from '../components/map/map';

export default function Home() {
  const listings: IPropertyListing[] = [
    {
      id: '123',
      title: 'Cool flat',
      price: 300,
      coordinates: {
        lat: 41.2795,
        lng: 69.2601,
      },
    },
    {
      id: '123',
      title: 'Shitty flat',
      price: 100,
      coordinates: {
        lat: 41.2195,
        lng: 69.2301,
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Tashrent</title>
        <meta
          name="description"
          content="Apartments for rent in Tashkent on a google map"
        />
      </Head>
      <Map listings={listings} />
    </>
  );
}
