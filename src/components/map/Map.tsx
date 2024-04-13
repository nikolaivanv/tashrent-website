import React, { useState, useRef, useEffect } from 'react';
import GoogleMap, { LatLngBounds, onGoogleApiLoadedProps } from 'google-maps-react-markers';
import Supercluster from 'supercluster';
import useSupercluster from '../../hooks/useSupercluster';
import Marker from './Marker';

type MapPoint = Supercluster.PointFeature<Supercluster.AnyProps>;
type ClusterPoint = Supercluster.ClusterFeature<Supercluster.AnyProps>;

type Props = {
  locations: IPropertyForMap[],
  onSelectLocations: (selectedLocationsIds: string) => void,
  highlightedPropertyId?: string,
};

function Map(props: Props) {
  console.log('Render: Map');
  const { locations, onSelectLocations, highlightedPropertyId } = props;
  const mapRef = useRef<any>(null);
  const [bounds, setBounds] = useState<LatLngBounds>(
    [69.15693006286622, 41.231565100006854, 69.3232699371338, 41.367364210349656],
  );
  const [zoom, setZoom] = useState(13);
  const [mapReady, setMapReady] = useState(false);
  const [highlighted, setHighlighted] = useState<string | undefined>(highlightedPropertyId);

  useEffect(() => {
    setHighlighted(highlightedPropertyId);
    const property = locations.find((location) => location.id === highlightedPropertyId);
    if (property && mapReady && mapRef.current) {
      mapRef.current.panTo({ lat: property.location.lat, lng: property.location.lng });
      mapRef.current.setZoom(18);
    }
  }, [highlightedPropertyId, mapRef, locations, mapReady]);

  const points: MapPoint[] = locations.map((location) => ({
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

  const onMarkerClick = (mapPoint: MapPoint) => {
    // mapRef.current.panTo({ lat: latitude, lng: longitude });
    setHighlighted(mapPoint.properties.locationId);
    onSelectLocations(mapPoint.properties.locationId);
  };

  const onClusterClick = (
    cluster: Supercluster.ClusterFeature<Supercluster.AnyProps>,
    longitude: number,
    latitude: number,
  ) => {
    const expansionZoom = Math.min(
      supercluster!.getClusterExpansionZoom(parseInt(cluster.id!.toString(), 10)),
      20,
    );
    mapRef.current.setZoom(expansionZoom);
    mapRef.current.panTo({ lat: latitude, lng: longitude });
  };

  const onGoogleApiLoaded = (props: onGoogleApiLoadedProps) => {
    const { map } = props;
    mapRef.current = map;
    setMapReady(true);
  };

  return (
    <div className="w-full h-screen">
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        defaultCenter={{ lat: 41.2995, lng: 69.2401 }}
        defaultZoom={13}
        onGoogleApiLoaded={onGoogleApiLoaded}
        options={options}
        // yesIWantToUseGoogleMapApiInternals
        onChange={(e) => {
          setZoom(e.zoom);
          const ne = e.bounds.getNorthEast();
          const sw = e.bounds.getSouthWest();
          setBounds([sw.lng(), sw.lat(), ne.lng(), ne.lat()]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            // point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                text={`${cluster.properties.point_count}`}
                // text={`${cluster.price}`}
                lat={latitude}
                lng={longitude}
                markerId={cluster.id!.toString()}
                isCluster
                highlighted={highlighted === cluster.id}
                onClick={() => onClusterClick(cluster as ClusterPoint, longitude, latitude)}
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
              onClick={() => onMarkerClick(cluster)}
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

Map.defaultProps = {
  highlightedPropertyId: undefined,
};

export default Map;
