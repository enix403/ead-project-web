import { Schema, model, Document, Types } from 'mongoose';

export interface IConversation extends Document<Types.ObjectId> {
  name?: string;
  kind: 'single' | 'group';

  participants: Types.ObjectId[];

  lastMessage?: string;
  lastUpdated: Date;

  creatorId: Types.ObjectId;
  createdAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    name: { type: String },
    kind: { type: String, enum: ['single', 'group'], required: true },
    participants: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ],

    lastMessage: { type: String },
    lastUpdated: { type: Date, default: Date.now },

    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const ConversationModel = model('Conversation', ConversationSchema);

/* ======================== */

export interface IChatMessage extends Document<Types.ObjectId> {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  content: string;
  sentAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const ChatMessageModel = model('ChatMessage', ChatMessageSchema);
