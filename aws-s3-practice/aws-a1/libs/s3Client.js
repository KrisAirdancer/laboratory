import 'dotenv/config';
import { S3Client } from "@aws-sdk/client-s3";

/***** FOR UPLOAD *****/

// Set the AWS Region.
const REGION = process.env.AWS_REGION; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

/***** EXPORTS *****/

export { s3Client };