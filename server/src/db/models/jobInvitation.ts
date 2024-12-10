import { Schema, Types, model, Document } from 'mongoose';

export interface IJobInvitation extends Document<Types.ObjectId> {
  postingId: Types.ObjectId;
  employeeId: Types.ObjectId;
  invitedByUserId: Types.ObjectId;
  invitedAt: Date;
  status: 'accepted' | 'rejected' | 'waiting';
}

const jobInvitationSchema = new Schema<IJobInvitation>(
  {
    postingId: {
      type: Schema.Types.ObjectId,
      ref: 'JobPosting',
      required: true,
    },
    employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    invitedByUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invitedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['accepted', 'rejected', 'waiting'],
      default: 'waiting',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

jobInvitationSchema.virtual('posting', {
  ref: 'JobPosting',
  localField: 'postingId',
  foreignField: '_id',
  justOne: true
});

jobInvitationSchema.virtual('inviter', {
  ref: 'User',
  localField: 'invitedByUserId',
  foreignField: '_id',
  justOne: true
});

jobInvitationSchema.virtual('employee', {
  ref: 'User',
  localField: 'employeeId',
  foreignField: '_id',
  justOne: true
});

// prettier-ignore
export const JobInvitationModel = model('JobInvitation', jobInvitationSchema);
