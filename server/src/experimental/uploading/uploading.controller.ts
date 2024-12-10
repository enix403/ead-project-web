import express from 'express';
import ah from 'express-async-handler';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { MediaUploadModel } from 'db/models/mediaUpload';
import { multerUpload } from './multer-config';
import { ApplicationError } from 'experimental/errors';

export const router = express.Router();

router.post(
  '/api/image-upload',
  multerUpload.single('image'),
  requireAuthenticated(),
  ah(async (req, res) => {

    if (!req.file)
      throw new ApplicationError('No file uploaded!', 400, 'empty_upload');

    // Extract file details
    const { filename } = req.file;

    // Save record in the database
    const record = new MediaUploadModel({
      name: filename,
      uploadTimestamp: new Date(),
    });

    const savedRecord = await record.save();

    return reply(res, savedRecord);
  }),
);
