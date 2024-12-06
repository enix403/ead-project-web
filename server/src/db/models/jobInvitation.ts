import { Schema, Types, model, Document } from 'mongoose';

export interface IJobInvitation extends Document {
  jobId: Types.ObjectId;
  employeeId: Types.ObjectId;
  invitedByUserId: Types.ObjectId;
  invitedAt: Date;
  status: 'accepted' | 'rejected' | 'waiting';
}

const jobInvitationSchema = new Schema<IJobInvitation>({
  jobId: { type: Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  invitedByUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  invitedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'waiting'],
    default: 'waiting',
  },
});

// prettier-ignore
export const JobInvitationModel = model('JobInvitation', jobInvitationSchema);
