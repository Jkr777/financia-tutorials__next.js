import dbConnect from "../../../lib/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

async function handler(req, res) {
  const { user, method } = req;

  switch (method) {
    case "GET":
      res.status(200).send(user);
      break;
    default:
      res.status(401).send('Not Authorized');
      break;
  }
}

export default withProtect(handler);