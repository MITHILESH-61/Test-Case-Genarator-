import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    projectName: {
      type: String,
      required: true,
      trim: true
    },
    repositoryUrl: {
      type: String,
      trim: true
    },
    sourceType: {
      type: String,
      enum: ['manual', 'upload', 'github'],
      default: 'manual'
    },
    repositoryPath: String,
    repositorySummary: String,
    detectedTechnologies: [String],
    detectedRoutes: [String],
    detectedModels: [String],
    detectedServices: [String],
    folderStructure: [String],
    architectureSummary: String
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);

