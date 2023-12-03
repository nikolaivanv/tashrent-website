import React from 'react';
import useProperties from '@/hooks/useProperties';
import PropertyDetailsCompact from './PropertyDetailsCompact';

type Props = {
  onNavigateToProperty: (propertyId: string) => void
  savedPropertiesIds: string[]
  onToggleSave: (propertyId: string) => void;
};

export default function Bookmarks(props: Props) {
  const { onNavigateToProperty, savedPropertiesIds, onToggleSave } = props;
  // const [savedPropertiesIds, setSavedPropertiesIds] = useState<string[]>([]);
  const { properties, isLoading, isError } = useProperties(savedPropertiesIds || []);
  // const [savedProperties, setSavedProperties] = useState<IPropertyListing[]>([]);

  const onPropertyClick = (propertyId: string) => {
    onNavigateToProperty(propertyId);
  };

  //   useEffect(() => {
  //     const getSavedPropertiesFromLocalStorage = () => {
  //       console.log('getSavedPropertiesFromLocalStorage');
  //       const savedPropertiesString = localStorage.getItem('savedProperties');
  //       if (savedPropertiesString) {
  //         setSavedPropertiesIds(JSON.parse(savedPropertiesString) as string[]);
  //       }
  //     };
  //     getSavedPropertiesFromLocalStorage();
  //     window.addEventListener('storage', getSavedPropertiesFromLocalStorage);
  //     return () => {
  //       window.removeEventListener('storage', getSavedPropertiesFromLocalStorage);
  //     };
  //   }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading properties</div>;
  }

  if (properties) {
    return (
      <div className="flex flex-col space-y-12">
        {properties.map((property) => (
          <div key={property.id}>
            <PropertyDetailsCompact
              property={property}
              isError={isError}
              isLoading={isLoading}
              onClick={() => onPropertyClick(property.id)}
              isPropertySaved={savedPropertiesIds.includes(property.id)}
              onToggleSave={onToggleSave}
            />
          </div>
        ))}
      </div>
    );
  }
}
