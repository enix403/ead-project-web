import { Schema, model, Types, Document } from 'mongoose';

export interface IJobApplication extends Document<Types.ObjectId> {
  postingId: Types.ObjectId;
  jobPosterId: Types.ObjectId;
  employeeId: Types.ObjectId;
  appliedAt: Date;

  answers: {
    question: string;
    answer: string;
  }[];

  isEmployerInterested: boolean;
  decision: 'accepted' | 'rejected' | 'waiting';
}

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    postingId: { type: Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    jobPosterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

jobApplicationSchema.virtual('posting', {
  ref: 'JobPosting',
  localField: 'postingId',
  foreignField: '_id',
  justOne: true
});

jobApplicationSchema.virtual('poster', {
  ref: 'User',
  localField: 'jobPosterId',
  foreignField: '_id',
  justOne: true
});

jobApplicationSchema.virtual('applicant', {
  ref: 'User',
  localField: 'employeeId',
  foreignField: '_id',
  justOne: true
});

// prettier-ignore
export const JobApplicationModel = model('JobApplication', jobApplicationSchema);
