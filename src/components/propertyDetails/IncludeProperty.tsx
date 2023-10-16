import useProperty from '@/hooks/useProperty';
import React from 'react';

const IncludeProperty = (Component, propertyId: string) => function (props) {
  const { isLoading, property, isError } = useProperty(propertyId);
  return <Component {...props} property={property} isLoading={isLoading} isError={isError} />;
};
export default IncludeProperty;
