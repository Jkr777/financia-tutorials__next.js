import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/link";
import withProtect from "../../../middleware/withProtect";
import withAdmin from "../../../middleware/withAdmin";

dbConnect();

async function handler(req, res) {
  const { body, method } = req;

  switch (method) {
    case "GET":
      try {
        const links = await Link.find({ approved: false });

        return JSON.stringify(links);
      } catch {
        return;
      }
    case "PATCH": 
      try {
        await Link.updateOne({ _id: body.id }, {$set: { approved: true }});

        return res.status(200).send("updated");
      } catch (error)  {
        return res.status(400).send(error);
      }
    case "DELETE":
      try {
        await Link.deleteOne({ _id: body.id });

        return res.status(200).send("removed");
      } catch (error) {
        return res.status(400).send(error);
      }
    default:
      return ;
  }
}

export default withProtect(withAdmin(handler, "admin"));