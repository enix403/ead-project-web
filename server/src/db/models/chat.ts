import { Schema, model, Document, Types } from 'mongoose';


export interface IConversation extends Document<Types.ObjectId> {
  participants: Types.ObjectId[];
  lastMessage?: string;
  lastUpdated: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessage: { type: String },
    lastUpdated: { type: Date, default: Date.now },
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
  receiverId: Types.ObjectId;
  content: string;
  sentAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const ChatMessageModel = model('ChatMessage', ChatMessageSchema);


