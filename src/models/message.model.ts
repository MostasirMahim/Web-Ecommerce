import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  text?: string;
  images: string[];
  attachments: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema: Schema<IMessage> = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    images: { type: [String], default: [] },
    attachments: { type: String, default: "" },
  },
  { timestamps: true }
);

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
