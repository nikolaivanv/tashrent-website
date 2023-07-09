import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllProperties } from '../../../helpers/api-utils';

type Data = {
  data: IPropertyListing[]
  message: string | null
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // const { propertyId } = req.query;

  if (req.method === 'GET') {
    let properties: IPropertyListing[] = [];
    try {
      properties = await getAllProperties();
    } catch (error) {
      res.status(500).json({ data: [], message: 'Getting properties failed.' });
    }
    res.status(200).json({ data: properties, message: null });
  }
}
