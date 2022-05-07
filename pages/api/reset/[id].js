import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import Joi from 'joi';
import _ from 'lodash';

async function handler(req, res) {
  const { method, body, query } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {   
        const { error } = joiReset(body);
        if(error) return res.status(400).send(error.details[0].message);
        
        const user = await User.findOne({
          reset_Token: query.id,
          reset_Token_Expiration_Time: { $gt: Date.now() }
        });
        if(!user) return res.status(401).send("This link expired, try again");

        user.set({
          password: body.password,
          reset_Token: null,
          reset_Token_Expiration_Time: null
        });
        await user.save();

        return res.status(201).send();
      } catch (error) {
        return res.status(401).send("Invalid email or password");
      }
    default:
      break;
  }
}

function joiReset(data) {
  const schema = Joi.object({
    password: Joi.string().trim().min(5).max(255).required()
  });
  
  return schema.validate(data);
}

export default handler;