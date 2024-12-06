import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document<Types.ObjectId> {
  username: string;
  email: string;
  password: string;
  role: 'employee' | 'employer' | 'admin';
  profilePicture?: string;
  bio?: string;
  location?: string;
  skills?: string[]; // Only for Employees
  companyName?: string; // Only for Employers
  isApproved?: boolean; // Only for Employers, whether admin has approved the employer
  employees?: mongoose.Types.ObjectId[]; // Employers can see employees
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['employee', 'employer', 'admin'],
      required: true,
    },
    profilePicture: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/.test(v);
        },
        message: 'Invalid URL for profile picture.',
      },
    },
    bio: { type: String, maxlength: 200 },
    location: { type: String },
    skills: [{ type: String }],
    companyName: { type: String },
    isApproved: { type: Boolean, default: false },
    employees: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
