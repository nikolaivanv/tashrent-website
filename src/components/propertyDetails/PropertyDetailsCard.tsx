import React from 'react';
import Image from 'next/image';
import useProperty from '@/hooks/useProperty';
import PropertyPhotoGallery from './PropertyPhotoGallery';

type Props = {
  propertyId: string
};

function PropertyDetailsCard(props: Props) {
  const { propertyId } = props;
  const { property, isLoading, isError } = useProperty(propertyId);

  if (isLoading) return 'Loading';

  if (!property) {
    return (
      <div>
        Not found
      </div>
    );
  }
  return (
    <div>
      <PropertyPhotoGallery images={property.photos} />

    </div>
  );
}

export default PropertyDetailsCard;
