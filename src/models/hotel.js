import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  //   rooms: [
  //     {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "Room",
  //       required: true,
  //     },
  //   ],
  rooms: [
    {
      type: String,
    },
  ],
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
