import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Badge name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Badge description is required'],
    },
    icon: {
      type: String,
      default: '🏆',
    },
    level: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum', 'legendary'],
      default: 'bronze',
    },
    type: {
      type: String,
      enum: ['hidden_gem', 'explorer', 'milestone', 'special'],
      default: 'special',
    },
    criteria: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Badge', badgeSchema);
