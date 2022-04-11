import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/link";
import Category from "../../../models/category";

async function handler(req, res) {
  const { body, method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const links = await Link.find({ approved: true }, {approved: 0, __v: 0}).sort({clicks: 1, date: 1}).limit(4);
        const categories = await Category.find({}, {__v: 0});

        return JSON.stringify({ links, categories });
      } catch {
        return;
      }
    default:
      return ;
  }
}

export default handler;