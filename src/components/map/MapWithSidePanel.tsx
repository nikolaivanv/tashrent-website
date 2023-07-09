import React, { useState, useRef } from 'react';
import GoogleMap from 'google-maps-react-markers';
import Marker from './Marker';
import SidePanel from '../sidePanel/SidePanel';
import PropertyDetails from '../propertyDetails/PropertyDetails';
import LocationFilters from './LocationFilters';

type Props = {
  locations: IPropertyForMap[]
};

function MapWithSidePanel(props: Props) {
  const { locations } = props;
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [highlighted, setHighlighted] = useState<string | undefined>();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const onMarkerClick = (markerId: string) => {
    setHighlighted(markerId);
    setSidePanelOpen(true);
  };

  const onSidePanelClose = () => {
    setSidePanelOpen(false);
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const onFilterProperties = (minPrice, maxPrice) => {
    const newFilteredLocations = locations.filter((location) => (location.price >= minPrice) && (location.price <= maxPrice));
    setFilteredLocations(newFilteredLocations);
  };

  const sidePanel = (
    <SidePanel title={`Property id: ${highlighted}`} onClose={onSidePanelClose}>
      <PropertyDetails propertyId={highlighted} />
    </SidePanel>
  );

  // <div style={{ height: '100vh', width: '100%' }}>
  return (
    <div className="h-screen w-full">
      <div><LocationFilters minPrice={0} maxPrice={2000} onFilter={onFilterProperties} /></div>
      {sidePanelOpen && sidePanel}
      <GoogleMap
        apiKey="AIzaSyBNiRXTTteHR_vvMGMFcWzGWrXyjN43DGk"
        defaultCenter={{ lat: 41.2995, lng: 69.2401 }}
        defaultZoom={13}
        onGoogleApiLoaded={onGoogleApiLoaded}
      >
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            text={`${location.price}`}
            lat={location.location.lat}
            lng={location.location.lng}
            markerId={location.id}
            highlighted={highlighted === location.id}
            onClick={onMarkerClick}
          />
        ))}

      </GoogleMap>
    </div>
  );
}

export default MapWithSidePanel;
