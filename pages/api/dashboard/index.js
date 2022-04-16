import dbConnect from "../../../lib/dbConnect";
import withProtect from "../../../middleware/withProtect";
import User from "../../../models/user";
import Joi from 'joi';
import _ from 'lodash';

dbConnect();

async function handler(req, res) {
  const { body, method, user } = req;

  switch (method) {
    case "GET":
      try {
        let userData =  JSON.stringify(_.pick(user, ["userName", "email"]));

        return userData;
      } catch {
        return;
      }
    case "PATCH":
      try {
        const { error } = joiUpdate(body);
        if(error) return res.status(400).send(error.details[0].message);
        
        const newUser = await User.findOne({ _id: user._id });
        newUser.set({...body});
        await newUser.save();

        return res.status(200).send(_.pick(newUser, ["userName", "email"]));
      } catch (error) {
        return res.status(400).send(error);
      }

    case "DELETE":
      try {
        await User.deleteOne({_id: user._id});
        
        return res.status(200).send("removed");
      } catch (error) {
        return res.status(400).send(error);
      }
    default:
      break;
  }
}

function joiUpdate(data) {
  const schema = Joi.object({
    userName: Joi.string().trim().min(5).max(255),
    email: Joi.string().email({minDomainSegments: 2}).trim().min(5).max(255),
    password: Joi.string().trim().min(5).max(255)
  });
  
  return schema.validate(data);
}

export default withProtect(handler);