import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
const jwt = require('jsonwebtoken');
import cookie from 'cookie';
import _ from 'lodash';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if(!req.headers.cookie) {
          return res.status(403).send("Not Authorized");
        }

        const { tradeSmart:token } = cookie.parse(req.headers.cookie);
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN);

        const user = await User.findOne({ _id: decoded._id });
        if(!user) return res.status(401).send('User not found');

        res.status(200).send(user);
      } catch (error) {
        res.status(401).send('Not Authorized');
      }

      break;
    default:
      res.status(401).send('Not Authorized');
      break;
  }
}