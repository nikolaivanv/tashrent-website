import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher<{ data: IPropertyListing[] | undefined, message: string | undefined }, string[]> = (urls: string[]) => {
  const f = (url: string) => fetch(url).then((res) => res.json());
  return Promise.all(urls.map((url) => f(url)));
};

type PropertiesResponse = {
  properties: IPropertyListing[] | undefined
  isLoading: boolean
  isError: boolean
};

function useProperties(propertyIds: string[]): PropertiesResponse {
  const urls = propertyIds.length > 0 ? propertyIds.map((id) => `/api/properties/${id}`) : null;
  const { data, error, isLoading } = useSWR(urls, fetcher);

  return {
    properties: data ? data.map((d) => d.data) : undefined,
    isLoading,
    isError: error,
  };
}

export default useProperties;
