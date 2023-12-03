import React, { useState, useRef, useEffect } from 'react';
import GoogleMap from 'google-maps-react-markers';
import useSupercluster from '../../hooks/useSupercluster';
import Marker from './Marker';

type Props = {
  locations: IPropertyForMap[],
  onSelectLocations: (selectedLocationsIds: number) => void,
  highlightedPropertyId?: string,
};

function Map(props: Props) {
  const { locations, onSelectLocations, highlightedPropertyId } = props;
  const mapRef = useRef(null);
  const [bounds, setBounds] = useState([69.15693006286622, 41.231565100006854, 69.3232699371338, 41.367364210349656]);
  const [zoom, setZoom] = useState(13);
  const [mapReady, setMapReady] = useState(false);
  const [highlighted, setHighlighted] = useState<string | undefined>(highlightedPropertyId);

  useEffect(() => {
    setHighlighted(highlightedPropertyId);
    const property = locations.find((location) => location.id === highlightedPropertyId);
    if (property && mapReady) {
      mapRef.current.panTo({ lat: property.location.lat, lng: property.location.lng });
      mapRef.current.setZoom(18);
    }
  }, [highlightedPropertyId, mapRef, locations, mapReady]);

  const points = locations.map((location) => ({
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
    options: { radius: 100, maxZoom: 20 },
  });

  const options = {
    mapTypeControl: false,
  };

  const onMarkerClick = (marker, longitude, latitude) => {
    // mapRef.current.panTo({ lat: latitude, lng: longitude });
    console.log(marker);
    setHighlighted(marker.properties.locationId);
    onSelectLocations(marker.properties.locationId);
  };

  const onClusterClick = (cluster, longitude, latitude) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20,
    );
    mapRef.current.setZoom(expansionZoom);
    mapRef.current.panTo({ lat: latitude, lng: longitude });
  };

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  return (
    <div className="w-full h-screen">
      <GoogleMap
        apiKey="AIzaSyBNiRXTTteHR_vvMGMFcWzGWrXyjN43DGk"
        defaultCenter={{ lat: 41.2995, lng: 69.2401 }}
        defaultZoom={13}
        onGoogleApiLoaded={onGoogleApiLoaded}
        options={options}
        yesIWantToUseGoogleMapApiInternals
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          setBounds([sw.lng(), sw.lat(), ne.lng(), ne.lat()]);
        }}
      >
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
                text={`${cluster.properties.point_count}`}
                // text={`${cluster.price}`}
                lat={latitude}
                lng={longitude}
                markerId={cluster.id}
                isCluster
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
              isCluster={false}
              markerId={cluster.properties.locationId}
              highlighted={highlighted === cluster.properties.locationId}
              onClick={() => onMarkerClick(cluster, longitude, latitude)}
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

export default Map;
