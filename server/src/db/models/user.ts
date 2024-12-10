import { model, Document, Schema, Types } from 'mongoose';

/* ===================== */

export interface IExperience {
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

/* ===================== */

export interface IUser extends Document<Types.ObjectId> {
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

const userSchema = new Schema<IUser>(
  {
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
      default: 'notSpecified',
    },
    profilePictureUrl: String,
    bio: String,
    addressCountry: String,
    addressCity: String,
    addressArea: String,
    addressZip: String,
    phone: String,
    experiences: { type: [experienceSchema], default: [] },
    skills: { type: [String], default: [] },

    companyName: String,
    companyPhone: String,
    companyCountry: String,
    companyCity: String,
    companyArea: String,
    companyZip: String,
    companyIndustry: String,

    isBanned: { type: Boolean, default: false },
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform(doc, ret, options) {
        // Remove passwordHash from any JSON response
        delete ret.passwordHash;
        return ret;
      },
    },
  },
);

/* Friendship.firstUserId === this._id */
userSchema.virtual('friendsWith', {
  ref: 'Friendship',
  localField: '_id',
  foreignField: 'firstUserId',
});

/* Friendship.secondUserId === this._id */
userSchema.virtual('friendsOf', {
  ref: 'Friendship',
  localField: '_id',
  foreignField: 'secondUserId',
});

// prettier-ignore
export const UserModel = model('User', userSchema);
