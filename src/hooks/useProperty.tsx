import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher<{ data: IPropertyListing | undefined, message: string | undefined }, string> = (propertyId: string) => fetch(propertyId).then((res) => res.json());

type PropertyResponse = {
  property: IPropertyListing | undefined
  isLoading: boolean
  isError: boolean
};

function useProperty(propertyId: string): PropertyResponse {
  const { data, error, isLoading } = useSWR(`/api/properties/${propertyId}`, fetcher, { refreshInterval: 1800000, revalidateOnFocus: false });

  return {
    property: data ? data.data : undefined,
    isLoading,
    isError: error,
  };
}

export default useProperty;
