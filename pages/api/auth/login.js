import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import Joi from 'joi';
import cookie from 'cookie';
import _ from 'lodash';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();
  
  switch (method) {
    case 'POST':
      try {
        const { error } = joiLogIn(body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: body.email });
        if(!user) return res.status(401).send("Invalid email or password");

        const pass = await user.passCheck(body.password);
        if(!pass) return res.status(401).send("Invalid email or password");
        const token = user.setToken();

        res.setHeader('Set-Cookie', cookie.serialize("tradeSmart", token, {
          httpOnly: true,
          secure: process.env.NEXT_PUBLIC_NODE_ENV === "DEV" ? false : true,
          maxAge: '54000000',
          sameSite: 'strict',
          path: '/'
        }));

        return res.status(200).send(_.pick(user, ["email", "userName", "role"]));
      } catch (error) {
        return res.status(400).send("Invalid email or password");
      }
    default:
      break;
  }

}

function joiLogIn(data) {
  const schema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2}).trim().min(3).max(255).required(),
    password: Joi.string().trim().min(3).max(255).required(),
  });
  
  return schema.validate(data);
}
