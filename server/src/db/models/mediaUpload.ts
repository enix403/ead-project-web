import { Schema, model, Types, Document } from 'mongoose';

export interface IMediaUpload extends Document<Types.ObjectId> {
  name: string;
  uploadedAt: Date;
}

const MediaUploadSchema = new Schema<IMediaUpload>(
  {
    name: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// prettier-ignore
export const MediaUploadModel = model('MediaUpload', MediaUploadSchema);
