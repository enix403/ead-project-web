import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
  job: mongoose.Types.ObjectId; // Refers to the job being applied for
  applicant: mongoose.Types.ObjectId; // Refers to the employee who applied
  resumeUrl: string;
  coverLetter?: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  createdAt?: Date;
}

const JobApplicationSchema: Schema<IJobApplication> = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Refers to the job
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the employee
    resumeUrl: { type: String, required: true }, // Link to the resume
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Accepted', 'Rejected'],
      default: 'Submitted',
    },
  },
  {
    timestamps: true,
  }
);

export const JobApplicationModel = mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
