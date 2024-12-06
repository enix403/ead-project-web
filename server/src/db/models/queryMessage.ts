import { Schema, model } from 'mongoose';

export interface IQueryMessage extends Document {
  name: string;
  email: string;
  body: string;
  createdAt: Date;
}

const queryMessageSchema = new Schema<IQueryMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

// prettier-ignore
export const QueryMessageModel = model('QueryMessage', queryMessageSchema);
