import React from 'react';
import PropertyDetailsCard from './PropertyDetailsCard';
import Drawer from '../ui/drawer/Drawer';
import IncludeProperty from './IncludeProperty';

type Props = {
  propertyId: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
};

function PropertyDetailsDrawer(props: Props) {
  const { propertyId, isOpen, setIsOpen } = props;
  const PropertyDetailsCardWithProperty = IncludeProperty(PropertyDetailsCard, propertyId);

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen} side="left" title="Сдается квартира">
      <PropertyDetailsCardWithProperty />
    </Drawer>
  );
}

export default PropertyDetailsDrawer;
