import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/link";
import withProtect from "../../../middleware/withProtect";
import withAdmin from "../../../middleware/withAdmin";

dbConnect();

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const links = await Link.find({ approved: true });

        return JSON.stringify(links);
      } catch {
        return;
      }
    default:
      return ;
  }
}

export default withProtect(withAdmin(handler, "admin"));