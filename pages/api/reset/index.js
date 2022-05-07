import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import Joi from 'joi';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import _ from 'lodash';

async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {        
        const { error } = joiReset(body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: body.email });
        if(!user) return res.status(401).send("Invalid email or password");

        let testAccount = await nodemailer.createTestAccount();
        let resetToken = crypto.randomBytes(32);
        resetToken = resetToken.toString('hex');

        user.set({
          reset_Token: resetToken,
          reset_Token_Expiration_Time: Date.now() + 3600000
        });

        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });

        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', 
          to: `${req.body.email}`, 
          subject: "Reset your password ✔", 
          text: "Reset your password ?", 
          html: `
            <h3>Reset your password</h3>
            <p>To set a new password <a href="/reset/${resetToken}">click here</a>.
          `
        });

        if(info.rejected.length) return res.status(501).send("Something went wrong, try again");
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
    email: Joi.string().email({minDomainSegments: 2}).trim().min(3).max(255).required()
  });
  
  return schema.validate(data);
}

export default handler;