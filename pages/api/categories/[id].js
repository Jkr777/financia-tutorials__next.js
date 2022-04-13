import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/link";
import Category from "../../../models/category";

async function handler(req, res, params) {
  const { body, method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let links, category;

        if(res.status) {
          const limitNr = Number(req.query.limit) || 1;
          const sortParam = req.query.sortOption === "popular" ? "clicks" : "date";

          links = await Link.find({ categoryName: req.query.id, approved: true }, {approved: 0, __v: 0}).sort({[sortParam]: -1}).skip((limitNr - 1) * 2).limit(2);

          return res.status(200).send(links);
        }

        links = await Link.find({ categoryName: params.id, approved: true }, {approved: 0, __v: 0}).sort({clicks: -1}).limit(4);
        category = await Category.findOne({categoryName: params.id}, {__v: 0});

        return JSON.stringify({ links, category });
      } catch(error) {
        console.log("errrrrrrrrrr", error);
        return;
      }
    default:
      return ;
  }
}

export default handler;