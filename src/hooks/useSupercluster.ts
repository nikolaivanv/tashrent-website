import { useState, useRef } from 'react';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import { dequal } from 'dequal';
import Supercluster from 'supercluster';

type MapProps = {
  points: Supercluster.PointFeature<Supercluster.AnyProps>[],
  bounds: [number, number, number, number],
  zoom: number,
  options: Supercluster.Options<Supercluster.AnyProps, Supercluster.AnyProps>,
};

function useSupercluster(mapProps: MapProps) {
  const {
    points, bounds, zoom, options,
  } = mapProps;

  // console.log(points);
  // console.log(zoom);

  const superclusterRef = useRef<Supercluster<Supercluster.AnyProps, Supercluster.AnyProps>>();
  const pointsRef = useRef<Supercluster.PointFeature<Supercluster.AnyProps>[]>();

  const [clusters, setClusters] = useState<(Supercluster.PointFeature<Supercluster.AnyProps>
  | Supercluster.ClusterFeature<Supercluster.AnyProps>)[]>([]);
  const zoomInt = Math.round(zoom);

  useDeepCompareEffectNoCheck(() => {
    if (!superclusterRef.current
      || !dequal(pointsRef.current, points)
    ) {
      superclusterRef.current = new Supercluster(options);
      superclusterRef.current.load(points);
    }

    if (bounds) {
      setClusters(superclusterRef.current.getClusters(bounds, zoomInt));
    }

    pointsRef.current = points;
  }, [points, bounds, zoomInt, options]);

  return {
    clusters,
    supercluster: superclusterRef.current,
  };
}

export default useSupercluster;
