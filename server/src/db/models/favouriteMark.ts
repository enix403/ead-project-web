import { Schema, model, Document, Types } from 'mongoose';

export interface IPostingFavouriteMark extends Document<Types.ObjectId> {
  userId: Types.ObjectId;
  postingId: Types.ObjectId;
}

const postingFavouriteMarkSchema = new Schema<IPostingFavouriteMark>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postingId: {
      type: Schema.Types.ObjectId,
      ref: 'JobPosting',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postingFavouriteMarkSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

postingFavouriteMarkSchema.virtual('posting', {
  ref: 'JobPosting',
  localField: 'postingId',
  foreignField: '_id',
  justOne: true,
});

// prettier-ignore
export const PostingFavouriteMarkModel = model('PostingFavouriteMark', postingFavouriteMarkSchema);
