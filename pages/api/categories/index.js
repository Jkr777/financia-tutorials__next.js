import dbConnect from "../../../lib/dbConnect";
import withAdmin from "../../../middleware/withAdmin";
import withProtect from "../../../middleware/withProtect";

async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      
      break;
  
    default:
      break;
  }
}

export default withProtect(withAdmin(handler));