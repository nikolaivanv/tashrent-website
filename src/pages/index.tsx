import React from 'react';
import Head from 'next/head';
import type {
  InferGetServerSidePropsType, InferGetStaticPropsType, GetServerSideProps, GetStaticProps,
} from 'next';
import MapSearch from '../components/mapSearch/MapSearch';
import { getAllPropertiesForMap } from '../helpers/api-utils';

type Props = {
  locations: IPropertyForMap[]
};

function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { locations } = props;
  // console.log('Render: Home');
  return (
    <>
      <Head>
        <title>Tashrent | Аренда квартир в Ташкенте | Удобный поиск на карте</title>
        <meta
          name="description"
          content="Tashrent | Аренда квартир в Ташкенте | Удобный поиск на карте"
        />
      </Head>
      <MapSearch locations={locations} />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const locations = await getAllPropertiesForMap();
//   return { props: { locations } };
// };

export const getStaticProps: GetStaticProps<Props> = async () => {
  // console.log('getStaticProps');
  const locations = await getAllPropertiesForMap();
  return {
    props: { locations },
    revalidate: 60 * 30,
  };
};

export default Home;
