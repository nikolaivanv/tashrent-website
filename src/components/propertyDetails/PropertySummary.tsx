import React from 'react';
import Typography from '../ui/typography/Typography';
import { Button } from '../ui/button/Button';
import BookmarkButton from '../ui/bookmarkButton/BookmarkButton';
import CopyLinkButton from '../ui/copyLinkButton/CopyLinkButton';

type Props = {
  property: IPropertyListing;
  isPropertySaved: boolean;
  onToggleSave: (propertyId: string) => void;
  showDescription: boolean
};

export default function PropertySummary(props: Props) {
  const {
    property, isPropertySaved, onToggleSave, showDescription,
  } = props;
  const roomsSpaceFloor = `${property.numberOfRooms} комн. • ${property.totalArea} м² • ${property.floor} / ${property.totalFloors} этаж`;

  // useEffect(() => {
  //   const savedPropertiesString = localStorage.getItem('savedProperties');
  //   let savedProperties: string[] = [];
  //   if (savedPropertiesString) {
  //     savedProperties = JSON.parse(savedPropertiesString) as string[];
  //   }
  //   setIsSaved(savedProperties.includes(property.id));
  // }, [property.id]);

  // const handleBookmark = useCallback(() => {
  //   const savedPropertiesString = localStorage.getItem('savedProperties');
  //   let savedProperties: string[] = [];
  //   if (savedPropertiesString) {
  //     savedProperties = JSON.parse(savedPropertiesString) as string[];
  //   }
  //   if (!isSaved) {
  //     if (!savedProperties.includes(property.id)) {
  //       savedProperties.push(property.id);
  //     }
  //   } else {
  //     savedProperties = savedProperties.filter((id) => id !== property.id);
  //   }
  //   localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
  //   setIsSaved((prev) => !prev);
  // }, [isSaved, property.id]);

  // const isSaved = () => {
  //   const savedPropertiesString = localStorage.getItem('savedProperties');
  //   let savedProperties: string[] = [];
  //   if (savedPropertiesString) {
  //     savedProperties = JSON.parse(savedPropertiesString) as string[];
  //   }
  //   return savedProperties.includes(property.id);
  // };

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
      <div className="flex flex-row justify-between">
        <div>
          <Typography variant="md">{roomsSpaceFloor}</Typography>
          <Typography variant="md">{property.district}</Typography>
        </div>
        <div className="flex flex-row items-center px-4 space-x-2">
          <BookmarkButton
            onToggleSave={() => onToggleSave(property.id)}
            isSaved={isPropertySaved}
          />
          <CopyLinkButton />
        </div>
      </div>
      {showDescription && (
        <div className="mt-3 whitespace-pre-line border-t">
          <Typography variant="sm" accent="primary">{property.description}</Typography>
        </div>
      )}
    </div>
  );
}
