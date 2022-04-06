import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/category";
import Link from "../../../models/link";
import Joi from "joi";
import withProtect from "../../../middleware/withProtect";

dbConnect();

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({}, {_id: 1, categoryName: 1});
        // console.log(categories);
        return JSON.stringify(categories);
      } catch (error) {
        console.log(error);
      }

      break;
    case "POST":
      try {
        const { error } = joiValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);        

        await Link.create(req.body);
        
        return res.status(201).send("A new link was created");
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      break;
  }
}

function joiValidation(data) {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(155).required(),
    url: Joi.string().trim().min(5).max(255).required(),
    categoryName: Joi.string().trim().min(5).max(255).required()
  });
  
  return schema.validate(data);
}

export default withProtect(handler);