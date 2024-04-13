import React from 'react';
import PropertyDetailsCard from './PropertyDetailsCard';
import Drawer from '../ui/drawer/Drawer';
import IncludeProperty from './IncludeProperty';

type Props = {
  propertyId: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onToggleSave: (propertyId: string) => void;
  isPropertySaved: boolean;
};

function PropertyDetailsDrawer(props: Props) {
  console.log('Render: PropertyDetailsDrawer', props.propertyId);
  const {
    propertyId, isOpen, setIsOpen, onToggleSave, isPropertySaved,
  } = props;
  const PropertyDetailsCardWithProperty = IncludeProperty(PropertyDetailsCard, propertyId);

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen} side="left" title="Сдается квартира">
      <PropertyDetailsCardWithProperty
        onToggleSave={onToggleSave}
        isPropertySaved={isPropertySaved}
      />
    </Drawer>
  );
}

export default PropertyDetailsDrawer;
