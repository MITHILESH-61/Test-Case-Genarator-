import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true
    },
    userMessage: {
      type: String,
      required: true
    },
    assistantMessage: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Chat = mongoose.model('Chat', chatSchema);

