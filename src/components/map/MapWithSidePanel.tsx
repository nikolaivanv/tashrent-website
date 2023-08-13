import React, { useState, useRef } from 'react';
import GoogleMap from 'google-maps-react-markers';
import useSupercluster from '../../hooks/useSupercluster';
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
  const [bounds, setBounds] = useState([69.15693006286622, 41.231565100006854, 69.3232699371338, 41.367364210349656]);
  const [zoom, setZoom] = useState(13);
  const [mapReady, setMapReady] = useState(false);
  const [highlighted, setHighlighted] = useState<string | undefined>();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const points = filteredLocations.map((location) => ({
    type: 'Feature',
    properties: { cluster: false, locationId: location.id, price: location.price },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(location.location.lng.toString()),
        parseFloat(location.location.lat.toString()),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 40, maxZoom: 20 },
  });

  const onMarkerClick = (markerId: string) => {
    setHighlighted(markerId);
    setSidePanelOpen(true);
  };

  const onClusterClick = (cluster, longitude, latitude) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20,
    );
    mapRef.current.setZoom(expansionZoom);
    mapRef.current.panTo({ lat: latitude, lng: longitude });
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
        yesIWantToUseGoogleMapApiInternals
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          setBounds([sw.lng(), sw.lat(), ne.lng(), ne.lat()]);
        }}
      >
        {console.log(clusters)}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                text={`${cluster.properties.point_count} properties`}
                // text={`${cluster.price}`}
                lat={latitude}
                lng={longitude}
                markerId={cluster.id}
                highlighted={highlighted === cluster.id}
                onClick={() => onClusterClick(cluster, longitude, latitude)}
              />
            );
          }

          return (
            <Marker
              key={cluster.id}
              text={`$${cluster.properties.price}`}
              lat={latitude}
              lng={longitude}
              markerId={cluster.properties.locationId}
              highlighted={highlighted === cluster.properties.locationId}
              onClick={onMarkerClick}
            />
          );
        })}

        {/* {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            text={`${location.price}`}
            lat={location.location.lat}
            lng={location.location.lng}
            markerId={location.id}
            highlighted={highlighted === location.id}
            onClick={onMarkerClick}
          />
        ))} */}

      </GoogleMap>
    </div>
  );
}

export default MapWithSidePanel;
