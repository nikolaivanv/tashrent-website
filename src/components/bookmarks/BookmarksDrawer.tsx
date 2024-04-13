import React from 'react';

import Drawer from '../ui/drawer/Drawer';
import Bookmarks from './Bookmarks';

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onNavigateToProperty: (propertyId: string) => void
  savedPropertiesIds: string[]
  onToggleSave: (propertyId: string) => void;
};

function BookmarksDrawer(props: Props) {
  const {
    isOpen, setIsOpen, onNavigateToProperty, savedPropertiesIds, onToggleSave,
  } = props;

  console.log('Render: BookmarksDrawer');

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen} side="left" title="Сохраненные объявления">
      <Bookmarks
        onNavigateToProperty={onNavigateToProperty}
        savedPropertiesIds={savedPropertiesIds}
        onToggleSave={onToggleSave}
      />
    </Drawer>
  );
}

export default BookmarksDrawer;
