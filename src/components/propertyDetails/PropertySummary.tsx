import React from 'react';
import { ExternalLink } from 'react-feather';
import Typography from '../ui/typography/Typography';
import { Button } from '../ui/button/Button';

type Props = {
  property: IPropertyListing;
};

export default function PropertySummary(props: Props) {
  const { property } = props;
  const roomsSpaceFloor = `${property.numberOfRooms} комн. • ${property.totalArea} м² • ${property.floor} / ${property.totalFloors} этаж`;
  return (
    <div className="px-3">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="xl" customWeight="bold">{`$${property.priceUSD}`}</Typography>
        <Button variant="link">

          <a href={property.sourceUrl} target="_blank" rel="noreferrer">
            Объявление на OLX
          </a>

        </Button>
      </div>
      <Typography variant="md">{roomsSpaceFloor}</Typography>
      <Typography variant="md">{property.district}</Typography>
      <div className="mt-3 whitespace-pre-line border-t">
        <Typography variant="sm" accent="primary">{property.description}</Typography>
      </div>
    </div>
  );
}
