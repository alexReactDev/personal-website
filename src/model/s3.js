import dotenv from "dotenv";
dotenv.config();

import AWS from "aws-sdk";

const s3 = new AWS.S3();

export default s3;