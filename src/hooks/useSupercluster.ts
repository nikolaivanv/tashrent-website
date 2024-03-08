import React, { useState, useRef } from 'react';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import { dequal } from 'dequal';
import Supercluster from 'supercluster';

function useSupercluster(_ref) {
  const {
    points, bounds, zoom, options,
  } = _ref;

  // console.log(points);
  // console.log(zoom);

  const superclusterRef = useRef();
  const pointsRef = useRef();

  const [clusters, setClusters] = useState([]);
  const zoomInt = Math.round(zoom);

  useDeepCompareEffectNoCheck(() => {
    if (!superclusterRef.current
      || dequal(pointsRef.current, points)
      || !dequal(superclusterRef.current.options, options)) {
      superclusterRef.current = new Supercluster(options);
      superclusterRef.current!.load(points);
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
