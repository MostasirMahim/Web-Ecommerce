import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: [] }],
  },
  { timestamps: true }
);

const Conversation: Model<IConversation> = mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;
