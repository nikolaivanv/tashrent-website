import React from 'react';
import Image from 'next/image';
// import Typography from '../ui/typography/Typography';
import PropertySummary from '../propertyDetails/PropertySummary';
import { Button } from '../ui/button/Button';

type Props = {
  property: IPropertyListing;
  isLoading: boolean;
  isError: boolean;
  onClick: () => void;
  isPropertySaved: boolean;
  onToggleSave: (propertyId: string) => void;
};

export default function PropertyDetailsCompact(props: Props) {
  const {
    property, isLoading, isError, onClick, isPropertySaved, onToggleSave,
  } = props;
  const photo = property.photos[0];
  // const roomsSpaceFloor = `${property.numberOfRooms} комн. • ${property.totalArea} м² • ${property.floor} / ${property.totalFloors} этаж`;
  return (
    <div className="flex flex-col w-screen max-w-lg dark:bg-black">
      <div className="relative py-3 aspect-square">
        <Image
          src={photo.url}
          fill
          alt="Property photo"
          style={{
            objectFit: 'cover',
          }}
          priority
        />
      </div>
      <PropertySummary
        property={property}
        isPropertySaved={isPropertySaved}
        onToggleSave={onToggleSave}
        showDescription={false}
      />

      <Button variant="link" className="w-full" onClick={onClick}>Подробнее</Button>
      {/* <Typography variant="xl" customWeight="bold">{`$${property.priceUSD}`}</Typography>
      <div>
        <Typography variant="md">{roomsSpaceFloor}</Typography>
        <Typography variant="md">{property.district}</Typography>
      </div> */}
    </div>
  );
}
