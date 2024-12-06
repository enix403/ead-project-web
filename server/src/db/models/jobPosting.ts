import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Contract';
  employer: mongoose.Types.ObjectId; // Refers to the employer who posted the job
  applicants: mongoose.Types.ObjectId[]; // List of applicants for this job
  status: 'Active' | 'Inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema: Schema<IJob> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract'],
      required: true,
    },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to an employer
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // List of applicant IDs (employees)
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  {
    timestamps: true,
  }
);

export const JobModel = mongoose.model<IJob>('Job', JobSchema);
