import AWS from 'aws-sdk';

const {
  AWS_ACCESS_KEY_ID,
  AWS_ACCESS_SECRET,
  S3_BUCKET_NAME
} = process.env;

const config = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_ACCESS_SECRET,
};

AWS.config.update(config);

const S3 = new AWS.S3();
const settings = {
  bucket: S3_BUCKET_NAME
}

export {
  S3,
  settings,
};
