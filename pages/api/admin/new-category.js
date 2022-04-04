import dbConnect from "../../../lib/dbConnect";
import withProtect from "../../../middleware/withProtect";
import withAdmin from "../../../middleware/withAdmin";

dbConnect();

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return;
    default:
      return;
  }
}

export default withProtect(withAdmin(handler, "admin"));