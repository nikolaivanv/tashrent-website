import React from 'react';
import PropertyDetailsCard from './PropertyDetailsCard';
import Drawer from '../ui/drawer/Drawer';

type Props = {
  propertyId: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
};

function PropertyDetailsDrawer(props: Props) {
  const { propertyId, isOpen, setIsOpen } = props;

  return (
    <Drawer title={`Property id: ${propertyId}`} isOpen={isOpen} setIsOpen={setIsOpen}>
      <PropertyDetailsCard propertyId={propertyId} />
    </Drawer>
  );
}

export default PropertyDetailsDrawer;
