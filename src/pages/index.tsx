import React from 'react';
import Head from 'next/head';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MapWithSidePanel from '../components/map/MapWithSidePanel';
import { getAllPropertiesForMap } from '../helpers/api-utils';

type Props = {
  locations: IPropertyForMap[]
};

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { locations } = props;
  return (
    <>
      <Head>
        <title>Tashrent</title>
        <meta
          name="description"
          content="Apartments for rent in Tashkent on a google map"
        />
      </Head>
      <MapWithSidePanel locations={locations} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const locations = await getAllPropertiesForMap();
  return { props: { locations } };
};
