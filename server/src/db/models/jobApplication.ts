import { Schema, model, Types, Document } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: Types.ObjectId;
  employeeId: Types.ObjectId;
  appliedAt: Date;

  answers: { question: string; answer: string }[];
  isEmployerInterested: boolean;
  decision: 'accepted' | 'rejected' | 'waiting';
}

const jobApplicationSchema = new Schema<IJobApplication>({
  jobId: { type: Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  appliedAt: { type: Date, default: Date.now },

  answers: [
    {
      question: String,
      answer: String,
    },
  ],

  isEmployerInterested: { type: Boolean, default: false },
  decision: {
    type: String,
    enum: ['accepted', 'rejected', 'waiting'],
    default: 'waiting',
  },
});

// prettier-ignore
export const JobApplicationModel = model('JobApplication', jobApplicationSchema);
