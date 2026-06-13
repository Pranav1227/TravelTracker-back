import mongoose from 'mongoose';

const userVisitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['visited', 'bucketlist'],
      default: 'visited',
    },
    notes: {
      type: String,
      default: '',
      maxlength: 500,
    },
    memoryPhotoUrl: {
      type: String,
      default: '',
    },
    memoryNote: {
      type: String,
      default: '',
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

// Prevent duplicate visits – one user can only visit a place once
userVisitSchema.index({ user: 1, place: 1 }, { unique: true });

export default mongoose.model('UserVisit', userVisitSchema);
