import type { NextApiRequest, NextApiResponse } from 'next';
import { getPropertyById } from '../../../helpers/api-utils';

type Data = {
  data: IPropertyListing | undefined
  message: string | undefined
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { propertyId } = req.query;

  if (!propertyId) {
    res.status(404).json({ message: 'Property not found.', data: undefined });
  } else if (typeof propertyId !== 'string') {
    res.status(400).json({ data: undefined, message: 'Invalid property id.' });
  } else if (req.method === 'GET') {
    let property;
    try {
      property = await getPropertyById(propertyId);
    } catch (error) {
      res.status(500).json({ data: undefined, message: 'Getting properties failed.' });
    }
    if (property) {
      res.status(200).json({ data: property, message: undefined });
    } else {
      res.status(404).json({ message: 'Property not found.', data: undefined });
    }
  }
}

export default handler;
