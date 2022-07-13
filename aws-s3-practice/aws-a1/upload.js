import 'dotenv/config';
// const fs = require('fs');
import * as fs from 'fs';
// import * as fs from 'fs/promises';
// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand,
         GetObjectCommand,
         DeleteObjectCommand,
         ListObjectsV2Command 
        } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js";
import { nextTick } from 'process';

/***** PARAMETERS AND DATA *****/

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu feugiat pretium nibh ipsum consequat nisl vel. Sed nisi lacus sed viverra tellus in hac habitasse. Et netus et malesuada fames ac turpis egestas maecenas. Dictum non consectetur a erat nam at lectus urna duis. Vitae aliquet nec ullamcorper sit amet risus nullam eget. Aenean et tortor at risus viverra adipiscing at. Elementum tempus egestas sed sed risus pretium. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Morbi leo urna molestie at elementum eu facilisis sed odio.'
  + 'Sit amet dictum sit amet justo donec enim diam vulputate. Diam ut venenatis tellus in metus vulputate. Venenatis cras sed felis eget velit. Ornare arcu dui vivamus arcu felis bibendum ut. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Commodo quis imperdiet massa tincidunt nunc pulvinar. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Duis at tellus at urna. Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. In ante metus dictum at tempor commodo ullamcorper.'
  + 'Diam quam nulla porttitor massa id neque aliquam vestibulum. Augue eget arcu dictum varius duis. Accumsan sit amet nulla facilisi morbi. Nunc lobortis mattis aliquam faucibus purus in. Varius quam quisque id diam. Sem integer vitae justo eget magna fermentum iaculis. In ante metus dictum at tempor commodo. Purus faucibus ornare suspendisse sed nisi lacus. Mattis nunc sed blandit libero volutpat. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Porttitor eget dolor morbi non arcu risus. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Massa massa ultricies mi quis hendrerit. Sit amet porttitor eget dolor morbi non.'
  + 'Pulvinar mattis nunc sed blandit libero volutpat. Ac ut consequat semper viverra. Urna cursus eget nunc scelerisque viverra mauris in. Dui id ornare arcu odio ut sem nulla. Lobortis elementum nibh tellus molestie nunc. Aliquam sem et tortor consequat. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. Et egestas quis ipsum suspendisse ultrices gravida dictum. Pellentesque habitant morbi tristique senectus et. In nibh mauris cursus mattis molestie a iaculis at. Fames ac turpis egestas integer eget aliquet nibh. Fermentum leo vel orci porta non pulvinar neque. Sed sed risus pretium quam vulputate dignissim suspendisse in est. Rutrum quisque non tellus orci ac auctor augue. Sit amet cursus sit amet. Purus ut faucibus pulvinar elementum integer enim neque. Elit sed vulputate mi sit. Eget dolor morbi non arcu risus quis. Sodales neque sodales ut etiam.'
  + `Dictum fusce ut placerat orci nulla. Nunc aliquet bibendum enim facilisis gravida neque. Aliquam sem et tortor consequat id porta nibh venenatis cras. Sit amet volutpat consequat mauris nunc. Massa placerat duis ultricies lacus. Pretium viverra suspendisse potenti nullam ac. Magna etiam tempor orci eu lobortis elementum. Eget magna fermentum iaculis eu non diam. Volutpat odio facilisis mauris sit amet. Nisi porta lorem mollis aliquam ut porttitor leo a. Pretium fusce id velit ut tortor pretium viverra suspendisse. Neque ornare aenean euismod elementum nisi quis eleifend quam. Integer quis auctor elit sed vulputate. Eleifend donec pretium vulputate sapien. Quam vulputate dignissim suspendisse in est ante in. Libero volutpat sed cras ornare arcu dui vivamus arcu. Massa placerat duis ultricies lacus sed turpis tincidunt. Aliquam etiam erat velit scelerisque.`;

// Set the parameters
const upParams = {
  Bucket: process.env.AWS_BUCKET_NAME, // The name of the bucket. For example, 'sample_bucket_101'.
  // Key: 'psitransfer/lorem.txt', // The name of the object. For example, 'sample_upload.txt'.
  Key: 'psitransfer/sample_upload.txt', // The name of the object. For example, 'sample_upload.txt'.
  Body: lorem, // The content of the object. For example, 'Hello world!".
};

const downParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: 'psitransfer/lorem.txt'
};

const deleteParams = {
  Bucket: process.env.AWS_BUCKET_NAME, // The name of the bucket. For example, 'sample_bucket_101'.
  Key: 'psitransfer/sample_upload.txt' // The name of the object. For example, 'sample_upload.txt'.
};

/***** FUNCTION CALLS *****/

  // uploadFile({ Bucket: process.env.AWS_BUCKET_NAME, Key: 'psitransfer/lorem.txt' });
  // retrieveFile({ Bucket: process.env.AWS_BUCKET_NAME, Key: 'psitransfer/lorem.txt' });
  // deleteFile({ Bucket: process.env.AWS_BUCKET_NAME, Key: 'psitransfer/lorem.txt' });
  listFiles({ Bucket: 'youtransfer-files', Prefix: 'psitransfer/', Delimiter: '/' });

/***** FUNCTIONS *****/

/**
 * Returns a list of all of the files in the specified directory.
 */
async function listFiles(parameters) {
  try {
    const response = await s3Client.send(new ListObjectsV2Command(parameters));

    console.log(response);

    const files = response.Contents;

    files.forEach(file => {

      console.log(`FILE: ${file.Key}`);
    });
  } catch (err) {
    console.log("Error", err);
  }
};

/**
 * This function deletes a file from the specified AWS S3 bucket.
 */
async function deleteFile(parameters) {
  try {
    await s3Client.send(new DeleteObjectCommand(parameters));
  } catch (err) {
    console.log("Error", err);
  }
};

/**
 * This function uploads a file to the specified AWS S3 bucket.
 */
async function uploadFile(parameters) {
  try {
    await s3Client.send(new PutObjectCommand(parameters));
  } catch (err) {
    console.log("Error", err);
  }
};

/**
 * This function retrieves a file from the specified AWS S3 bucket.
 */
async function retrieveFile(parameters) {

  try {
    const response = await s3Client.send(new GetObjectCommand(parameters));

    // console.log(`DATA: ${response.Body}`);
    // console.log(`TYPE: ${typeof response.Body}`);
    
    const writeStream = fs.createWriteStream('./downFile.txt');
    response.Body.pipe(writeStream);
  } catch (err) {
    console.log("Error", err);
};








  // var file = fs.createWriteStream('downFile.txt');
  // s3Client.getObject(parameters).createReadStream().pipe(file);
}