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

        return links;
      } catch (error) {
        return error;
      }
    default:
      return ({error: "Something went wrong, please try again"});
  }
}

export default withProtect(withAdmin(handler, "admin"));