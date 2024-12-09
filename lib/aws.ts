import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

AWS.config.update({ region: 'ap-southeast-1' });

const s3 = new AWS.S3();

export const uploadFileToS3 = async (filePath: string, fileName: string, folder: string): Promise<string> => {
  const fileContent = fs.readFileSync(filePath);

  const ext = path.extname(fileName).toLowerCase();
  let contentType = '';

  if (ext === '.jpg' || ext === '.jpeg') {
    contentType = 'image/jpeg';
  } else if (ext === '.png') {
    contentType = 'image/png';
  } else {
    throw new Error('Unsupported file type. Only JPEG and PNG are allowed.');
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${folder}/${fileName}`,
    Body: fileContent,
    ContentDisposition: 'inline',
    ContentType: contentType,
  };

  const uploadResult = await s3.upload(params).promise();
  fs.unlinkSync(filePath); // Delete the file locally
  return uploadResult.Location; // Return the S3 URL
};
