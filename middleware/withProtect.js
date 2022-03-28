import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from "../models/user";

const withProtect = handler => {
  return async(req, res) => {
    if(!req.headers.cookie) {
      if(!res.status) throw({ error: "Not Authorized" });
      return res.status(403).send("Not Authorized");
    }

    try {
      const token = cookie.parse(req.headers.cookie);
      const decodedToken = jwt.verify(token.tradeSmart, process.env.NEXT_PUBLIC_JWT_TOKEN);

      const user = await User.findOne({ _id: decodedToken._id });

      if((!user) && !res.status) throw({ error: "User not found" });
      if(!user) return res.status(401).send('User not found');

      req.user = user;

      return handler(req, res);
    } catch (error) {
      if(!res.status) throw({ error: "Not Authorized" });

      res.status(401).send('Not Authorized');
    }
  }
};

export default withProtect;