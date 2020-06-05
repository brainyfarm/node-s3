import fs from 'fs';
import url from 'url';

import { S3, settings } from '../helper/aws.js';

const moveToS3 = (filePath, cb) => {
  const params = {
    Bucket: settings.bucket,
    Body: fs.createReadStream(filePath),
    Key: filePath
  };

  return S3.upload(params, (err, data) => {
    if(err) 
      return console.log(err);
    return cb(data);
  });
}

const getSignedUrl = async (objectKey) => {
  const expiryTime = 60 * 60;
  const url = await S3.getSignedUrlPromise('getObject', {
    Bucket: settings.bucket,
    Key: objectKey,
    Expires: expiryTime,
  });
  return url;
}

const uploadFile = async (req, res) => {
  try {
    if(!req.file) {
      return res.status(400).json({
        status: false,
        message: 'No files uploaded'
      });
    } else {
      const { path, filename } = req.file;
      return moveToS3(path, async (data) => {
        const signedUrl = await getSignedUrl(data.key);
        return res.status(201).redirect(url.format({
          pathname: '/',
          query: {
            filename,
            url: signedUrl,
          }
        }))
      });
    }
  } catch(err) {
    return res.json({
      message: 'Unable to process'
    })
  }
} 

export {
  uploadFile,
}
