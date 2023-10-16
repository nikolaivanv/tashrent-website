import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import classNames from 'classnames';

type Props = {
  images: IImage[]
};

function PropertyPhotoGallery(props: Props) {
  const { images } = props;

  const additionalClass = classNames('w-20', 'h-20');

  const items = images.map((image) => (
    {
      additionalClass: { additionalClass },
      original: `${image.url};s=${image.width}x${image.height}`,
      originalHeight: image.height,
      originalWidth: image.width,
      // originalHeight: 30, // image.height,
      // originalWidth: 30, // image.width,
      showThumbnails: false,
    }
  ));
  return (
    <ImageGallery items={items} />
  );
}

export default PropertyPhotoGallery;

// https://www.npmjs.com/package/react-snap-carousel
