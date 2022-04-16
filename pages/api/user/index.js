import dbConnect from "../../../lib/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

async function handler(req, res) {
  const { user, method } = req;

  switch (method) {
    case "GET":
      return res.status(200).send(user);
    default:
      break;
  }
}

export default withProtect(handler);