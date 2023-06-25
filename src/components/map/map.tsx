import React, { useState, useRef } from 'react';
import GoogleMap from 'google-maps-react-markers';
import Marker from './marker';

type Props = {
  listings: IPropertyListing[]
};

function Map(props: Props) {
  const { listings } = props;
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [highlighted, setHighlighted] = useState(null);

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    setHighlighted(markerId);
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {mapReady && <div>Map is ready. See for logs in developer console.</div>}
      <GoogleMap
        apiKey="AIzaSyBNiRXTTteHR_vvMGMFcWzGWrXyjN43DGk"
        defaultCenter={{ lat: 41.2995, lng: 69.2401 }}
        defaultZoom={13}
        onGoogleApiLoaded={onGoogleApiLoaded}
      >
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            text={`${listing.price}`}
            lat={listing.coordinates.lat}
            lng={listing.coordinates.lng}
            markerId={listing.id}
            onClick={onMarkerClick}
          />
        ))}

      </GoogleMap>
    </div>
  );
}

export default Map;
