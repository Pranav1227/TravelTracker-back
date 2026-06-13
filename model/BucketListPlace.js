import mongoose from 'mongoose';

const bucketListPlaceSchema = new mongoose.Schema(
  {
    bucketList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BucketList',
      required: true,
      index: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
      maxlength: 500,
    },
    isVisited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicate places within the same bucket list
bucketListPlaceSchema.index({ bucketList: 1, place: 1 }, { unique: true });

export default mongoose.model('BucketListPlace', bucketListPlaceSchema);
