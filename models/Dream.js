import mongoose from 'mongoose';

const DreamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      unique: false,
    },
    status: String,
    // tags: {
    //   type: Array,
    //   default: [],
    // },
    // viewsCount: {
    //   type: Number,
    //   default: 0,
    // },
    imageUrl: {
      type: String,
      unique: false,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    user: {
      type: String,
      unique: false,
    },
    handler: {
      type: String || null,
      unique: false,
    },
  },
  {
    timeStamps: true,
  },
);

export default mongoose.model('Dream', DreamSchema);
