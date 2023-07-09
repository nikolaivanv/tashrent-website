import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';

type Props = {
  images: IImage[]
};

function PropertyPhotoGallery(props: Props) {
  const { images } = props;

  const items = images.map((image) => (
    {
      original: `${image.url};s=${image.width}x${image.height}`,
      originalHeight: image.height,
      originalWidth: image.width,
      showThumbnails: false,
    }
  ));
  return (
    <ImageGallery items={items} />
  );
}

export default PropertyPhotoGallery;
