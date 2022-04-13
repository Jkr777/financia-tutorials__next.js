import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/link";

async function handler(req, res, params) {
  const { query, body, method } = req;
  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        await Link.updateOne(
          { _id: query.id, approved: true },
          {$inc: {
            clicks: 1
          }}
        );
        
        return res.status(200).send();
      } catch {
        console.log("errrrrrrrrrr");
        return;
      }
    default:
      return ;
  }
}

export default handler;