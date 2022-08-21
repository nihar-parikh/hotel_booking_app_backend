import mongoose from "mongoose";
const { Schema } = mongoose;
import validator from "validator";

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [
      {
        number: {
          type: Number,
          required: true,
        },
        unavailableDates: [
          {
            type: Date,
            required: true,
          },
        ],
      },
    ],
    hotel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
