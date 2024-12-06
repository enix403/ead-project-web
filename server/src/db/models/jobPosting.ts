import { Schema, model, Document } from 'mongoose';

export interface IJobPosting extends Document {
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
  expireAt?: Date;
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
export const JobPostingModel = model('JobPosting', jobPostingSchema);
