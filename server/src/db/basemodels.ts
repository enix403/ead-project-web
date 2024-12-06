import mongoose, { Document, Schema } from 'mongoose';

interface IExperience {
  title: string;
  company: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  currentlyActive: boolean;
}

const experienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  currentlyActive: { type: Boolean, default: false },
});

interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'admin' | 'employer' | 'employee';

  fullName: string;
  gender: 'male' | 'female' | 'notSpecified';
  profilePictureUrl?: string;
  bio?: string;
  addressCountry?: string;
  addressCity?: string;
  addressArea?: string;
  addressZip?: string;
  phone?: string;
  experiences: IExperience[];
  skills: string[];

  companyName?: string;
  companyPhone?: string;
  companyCountry?: string;
  companyCity?: string;
  companyArea?: string;
  companyZip?: string;
  companyIndustry?: string;

  isBanned: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'employer', 'employee'],
    required: true,
  },

  fullName: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'notSpecified'],
    required: true,
  },
  profilePictureUrl: String,
  bio: String,
  addressCountry: String,
  addressCity: String,
  addressArea: String,
  addressZip: String,
  phone: String,
  experiences: [experienceSchema],
  skills: [String],

  companyName: String,
  companyPhone: String,
  companyCountry: String,
  companyCity: String,
  companyArea: String,
  companyZip: String,
  companyIndustry: String,

  isBanned: { type: Boolean, default: false },
});

// prettier-ignore
export const UserModel = mongoose.model<IUser>('User', userSchema);

/* =============================== */

interface IJobPosting extends Document {
  title: string;
  description?: string;
  category?: string;
  specialism?: string;
  jobType: 'fullTime' | 'partTime' | 'internship' | 'specificDates';

  expLevelRequired: 'entry' | 'mid' | 'senior';

  qualificationsRequired: string[];
  qualificationsDesired: string[];

  salaryMode: 'monthly' | 'hourly';
  salary: number;

  startDate?: Date;
  endDate?: Date;
  startTime?: Date;
  endTime?: Date;

  benefits: string[];
  workingLanguage?: string;
  residence: 'yes' | 'no' | 'allowance';
  food: 'yes' | 'no' | 'oneMeal' | 'twoMeal' | 'allowance';
  transport: 'required' | 'notRequired' | 'mopedProvided' | 'carProvided';

  companyName: string;
  companyUsername: string;
  companyDescription?: string;
  companyWebsite?: string;
  companyLogoUrl?: string;
  companyCountry?: string;
  companyCity?: string;
  companyArea?: string;
  companyZip?: string;
  companyMapAddress?: string;

  questions: string[];

  postedAt: Date;
  expireAt: Date;
  isActive: boolean;
}

const jobPostingSchema = new Schema<IJobPosting>({
  title: { type: String, required: true },
  description: String,
  category: String,
  specialism: String,
  jobType: {
    type: String,
    enum: ['fullTime', 'partTime', 'internship', 'specificDates'],
    required: true,
  },

  expLevelRequired: { type: String, enum: ['entry', 'mid', 'senior'] },

  qualificationsRequired: [String],
  qualificationsDesired: [String],

  salaryMode: { type: String, enum: ['monthly', 'hourly'] },
  salary: Number,

  startDate: Date,
  endDate: Date,
  startTime: Date,
  endTime: Date,

  benefits: [String],
  workingLanguage: String,
  residence: { type: String, enum: ['yes', 'no', 'allowance'] },
  food: {
    type: String,
    enum: ['yes', 'no', 'oneMeal', 'twoMeal', 'allowance'],
  },
  transport: {
    type: String,
    enum: ['required', 'notRequired', 'mopedProvided', 'carProvided'],
  },

  companyName: String,
  companyUsername: String,
  companyDescription: String,
  companyWebsite: String,
  companyLogoUrl: String,
  companyCountry: String,
  companyCity: String,
  companyArea: String,
  companyZip: String,
  companyMapAddress: String,

  questions: [String],

  postedAt: { type: Date, default: Date.now },
  expireAt: Date,
  isActive: { type: Boolean, default: true },
});

// prettier-ignore
export const JobPostingModel = mongoose.model<IJobPosting>('JobPosting', jobPostingSchema);

/* =============================== */

interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
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
export const JobApplicationModel = mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema);

/* =============================== */

interface IJobInvitation extends Document {
  jobId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  invitedByUserId: mongoose.Types.ObjectId;
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
export const JobInvitationModel = mongoose.model<IJobInvitation>('JobInvitation', jobInvitationSchema);
