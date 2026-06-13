import mongoose from 'mongoose';

const bucketListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicate bucket list names for the same user
bucketListSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model('BucketList', bucketListSchema);
