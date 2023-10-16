import React from 'react';
import Image from 'next/image';

import PropertyPhotoGallery from './PropertyPhotoGallery';

type Props = {
  property: IPropertyListing;
  isLoading: boolean;
  isError: boolean;
};

function PropertyDetailsCard(props: Props) {
  const { property, isLoading, isError } = props;

  if (!property) {
    return (
      <div>
        Not found
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        Error loading property info
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        Loading
      </div>
    );
  }
  return (
    <div className="flex w-120">
      <PropertyPhotoGallery images={property.photos} />
    </div>
  );
}

export default PropertyDetailsCard;
