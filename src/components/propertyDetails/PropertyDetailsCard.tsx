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
    <div className="w-[500px]">
      <PropertyPhotoGallery images={property.photos} />
      <div>
        <div className="text-black">
          {property.title}
        </div>
        <div className="text-black">
          {property.priceUSD}
        </div>
        <div className="text-black">
          {property.description}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsCard;
