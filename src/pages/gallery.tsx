import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { SlideShow, SlideShowItem } from '@/components/ui/slideshow/Slideshow';

const items = [
  { title: 'It’s giving', subtitle: '52.073273, -1.014818' },
  { title: 'Era', subtitle: '47.220244, 14.764848' },
  { title: 'Iykyk', subtitle: '50.435664924, 5.969496122' },
  { title: 'Slay', subtitle: '45.618997524, 9.286998852' },
  { title: 'Fell off', subtitle: '34.83916331, 136.537664516' },
  { title: 'Gatekeep', subtitle: '30.133883, -97.641144' },
  { title: 'Situationship', subtitle: '19.4025167233, -99.0865813203' },
  { title: 'Bad take', subtitle: '-23.702163858, -46.693163894' },
  { title: 'Private not secret', subtitle: '45.503497986, -73.522664576' },
  { title: 'Touch grass', subtitle: '1.2881738473, 103.858484899' },
  { title: 'Rizz', subtitle: '47.573997704, 19.24249903' },
].map(({ title, subtitle }, i) => ({
  src: `https://picsum.photos/1280/720?idx=${i}`,
  title,
  subtitle,
}));

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery test</title>
        <meta
          name="description"
          content="Apartments for rent in Tashkent on a google map"
        />
      </Head>
      <div className="relative w-1/4 aspect-square">
        <Image
          alt="alt text"
          src="https://picsum.photos/1280/720?idx=0"
          fill
          className="object-cover"
          // style={{
          //   objectFit: 'cover',
          // }}
        />
      </div>
    </>
  );
}
