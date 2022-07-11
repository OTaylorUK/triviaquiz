import axios from "axios"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const sourceURL = "https://the-trivia-api.com/api/categories";
    
    const response = await axios.get(sourceURL);

    res.status(200).json(response.data);


} catch (err) {
    res.status(200).json({ message: 'error - failed recaptcha' });
}

}
