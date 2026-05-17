import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String
  },
  { _id: false }
);

const generationSchema = new mongoose.Schema(
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
    generationType: {
      type: String,
      default: 'test-suite'
    },
    goal: {
      type: String,
      required: true
    },
    inputSnippet: String,
    instructions: String,
    generatedContent: {
      type: String,
      required: true
    },
    qualityScore: {
      type: Number,
      default: 0
    },
    feedback: {
      type: feedbackSchema,
      default: () => ({ status: 'pending' })
    },
    retrievedContext: [String]
  },
  { timestamps: true }
);

export const Generation = mongoose.model('Generation', generationSchema);

