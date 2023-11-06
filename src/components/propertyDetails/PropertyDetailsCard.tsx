import React from 'react';
import Image from 'next/image';

import PropertyPhotoGallery from './PropertyPhotoGallery';
import PropertySummary from './PropertySummary';

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
    <div className="flex flex-col w-screen max-w-lg space-y-3 dark:bg-black">
      <PropertyPhotoGallery images={property.photos} />
      <PropertySummary property={property} />
    </div>
  );
}

export default PropertyDetailsCard;
