import mongoose from 'mongoose';

const embeddingSchema = new mongoose.Schema(
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
    generationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Generation'
    },
    embedding: {
      type: [Number],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

export const Embedding = mongoose.model('Embedding', embeddingSchema);

