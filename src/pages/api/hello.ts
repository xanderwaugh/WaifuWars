import {
  type NextApiHandler,
  type NextApiRequest,
  type NextApiResponse,
} from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/require-await
) => {
  return res.status(200).json({ name: "John Doe" });
};

export default handler;
