import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createRoom = catchAsyncErrors(async (req, res, next) => {
  const { title, description, price, maxPeople, roomNumbers } = req.body;
  const room = await Room.create({
    title,
    description,
    price,
    maxPeople,
    roomNumbers,
    hotel: req.params.hotelId,
  });

  // catchAsyncErrors(
  //   await Hotel.findByIdAndUpdate(req.params.hotelId, {
  //     $push: { rooms: room._id },
  //   })
  // );
  const hotel = await Hotel.findById(req.params.hotelId);
  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }
  await Hotel.findByIdAndUpdate(
    req.params.hotelId,
    {
      $push: { rooms: room._id },
    },
    {
      new: true,
      newValidator: true,
      useFindAndModify: true,
    }
  );

  res.status(201).json({
    success: true,
    room,
  });
});

//delete room --admin
export const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.params.roomId);
  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  let hotel = await Hotel.findById(req.params.hotelId);
  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }

  await Room.findByIdAndDelete(room._id);
  await Hotel.findByIdAndUpdate(
    hotel._id,
    {
      $pull: { rooms: room._id },
    },
    {
      new: true,
      newValidator: true,
      useFindAndModify: true,
    }
  );
  res.status(201).json({
    success: true,
    room,
  });
});

//get a single room
export const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.params.roomId);

  if (!room) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Product not found",
    // });
    return next(new ErrorHandler("Room not found", 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

//get all rooms
export const getAllRooms = catchAsyncErrors(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json({
    success: true,
    rooms,
  });
});

//update room --admin
export const updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.params.roomId);
  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  room = await Room.findByIdAndUpdate(req.params.roomId, req.body, {
    new: true,
    newValidator: true,
    useFindAndModify: true,
  });
  res.status(201).json({
    success: true,
    room,
  });
});

//update room unavailablity
export const updateRoomUnavailablity = catchAsyncErrors(
  async (req, res, next) => {
    //updateOne only updates the mention field in the model
    await Room.updateOne(
      { "roomNumbers._id": req.params.roomNumbersId },
      {
        $push: {
          //if there is nested fields then this is the way to access the given field
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    //instead of doing this way u can create new model for roomNumbers
    res.status(200).json({
      success: true,
    });
  }
);
