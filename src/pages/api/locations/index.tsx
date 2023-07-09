import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPropertiesForMap } from '../../../helpers/api-utils';

type Data = {
  data: IPropertyForMap[]
  message: string | null
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // const { propertyId } = req.query;

  if (req.method === 'GET') {
    let locations: IPropertyForMap[] = [];
    try {
      locations = await getAllPropertiesForMap();
    } catch (error) {
      res.status(500).json({ data: [], message: 'Getting locations failed.' });
    }
    res.status(200).json({ data: locations, message: null });
  }
}

export default handler;
