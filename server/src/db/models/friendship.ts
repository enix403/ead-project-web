import { Schema, model, Types, Document } from 'mongoose';

/*
export interface IFriendshipRequest extends Document<Types.ObjectId> {
  requestingUserId: Types.ObjectId;
  targetUserId: Types.ObjectId;
  requestedAt: Date;
  decision: 'rejected' | 'waiting';
}

const FriendshipRequestSchema = new Schema<IFriendshipRequest>(
  {
    requestingUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requestedAt: { type: Date, default: Date.now },
    decision: {
      type: String,
      enum: ['rejected', 'waiting'],
      default: 'waiting',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

FriendshipRequestSchema.virtual('requestingUser', {
  ref: 'User',
  localField: 'requestingUserId',
  foreignField: '_id',
  justOne: true,
});

FriendshipRequestSchema.virtual('targetUser', {
  ref: 'User',
  localField: 'targetUserId',
  foreignField: '_id',
  justOne: true,
});

// prettier-ignore
export const FriendshipRequestModel = model('FriendshipRequest', FriendshipRequestSchema);
*/

/* ================================ */
/* ================================ */

export interface IFriendship extends Document<Types.ObjectId> {
  firstUserId: Types.ObjectId;
  secondUserId: Types.ObjectId;
  addedAt: Date;
}

const FriendshipSchema = new Schema<IFriendship>(
  {
    firstUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    secondUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// prettier-ignore
export const FriendshipModel = model('Friendship', FriendshipSchema);
