import AWS from "aws-sdk";
import uuid from "uuid";
import formidable from 'formidable'
import fs from "fs";
import Joi from "joi";
import Category from "../../../models/category";
import dbConnect from "../../../lib/dbConnect";
import withAdmin from "../../../middleware/withAdmin";
import withProtect from "../../../middleware/withProtect";

dbConnect();

async function handler(req, res) {
  const { method } = req;
  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
    signatureVersion: 'v4',
    region: 'eu-central-1'
  });

  switch (method) {
    case "POST":
      try {
        const form = new formidable.IncomingForm({ keepExtensions: true });

        form.parse(req, (err, fields, files) => {
          if (err) {
            console.log("errorrrrrrrrrrrrrrr:", err);
            return;
          }

          const { image } = files;
          const body = JSON.parse(fields.body);

          if(image.size > 200000) return res.status(400).send("Image size should be less than 1mb");

          const params = {
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
            Key: `category/${body.categoryName}`,
            Body: fs.readFileSync(image.filepath),
            ACL: 'public-read',
            ContentType: 'image/jpg'
          };
          
          s3.upload(params, async function(err, data) {
            if (err) {
              return res.status(400).send(err);
            }

            const { error } = joiValidation({ categoryName: body.categoryName, info: body.info, imgUrl: data.Location });
            if(error) return res.status(400).send(error.details[0].message);
           
            await Category.create({
              categoryName: body.categoryName,
              info: body.info,
              imgUrl: data.Location,
              imgKey: data.Key
            });
            
            res.status(201).send("New category created");
          });
        });
      } catch (error) {
        console.log("error rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
      }

      break;
    default:
      break;
  }
}

function joiValidation(data) {
  const schema = Joi.object({
    categoryName: Joi.string().trim().min(3).max(255).required(),
    info: Joi.string().trim().min(55).max(555).required(),
    imgUrl: Joi.string().trim().min(3).max(255).required()
  });
  
  return schema.validate(data);
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withProtect(withAdmin(handler));