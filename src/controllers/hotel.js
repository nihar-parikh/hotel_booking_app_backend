import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Hotel from "../models/hotel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";

//create hotel -- Admin
export const createHotel = catchAsyncErrors(async (req, res, next) => {
  //our user is in req.user, so passing user's id in product's req.body
  req.body.user = req.user._id;

  const hotel = await Hotel.create(req.body);
  res.status(201).json({
    success: true,
    hotel,
  });
});

//update hotel -- Admin
export const updateHotel = catchAsyncErrors(async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId);
  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }
  hotel = await Hotel.findByIdAndUpdate(req.params.hotelId, req.body, {
    new: true,
    newValidator: true,
    useFindAndModify: true,
  });
  res.status(201).json({
    success: true,
    hotel,
  });
});

//delete hotel --admin
export const deleteHotel = catchAsyncErrors(async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId);
  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }

  await Hotel.findByIdAndDelete(req.params.hotelId);
  res.status(201).json({
    success: true,
    hotel,
  });
});

//get a single hotel
export const getSingleHotel = catchAsyncErrors(async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).populate(
    "user",
    "name email role"
  );
  if (!hotel) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Product not found",
    // });
    return next(new ErrorHandler("Hotel not found", 404));
  }
  res.status(200).json({
    success: true,
    hotel,
  });
});

//get all hotels
export const getAllHotels = catchAsyncErrors(async (req, res) => {
  const hotelsPerPage = 2;

  const apiFeatures = new ApiFeatures(Hotel.find(), req.query)
    .search()
    .pagination(hotelsPerPage);
  const hotels = await apiFeatures.query;
  const hotelsCount = await Hotel.countDocuments();

  res.status(200).json({
    success: true,
    hotels,
    hotelsCount,
  });
});

//get all hotels by cities
export const getAllHotelsByCities = catchAsyncErrors(async (req, res, next) => {
  const cities = req.query.cities.split(",");
  const hotels = await Promise.all(
    cities.map((city) => {
      return Hotel.find({ city });
    })
  );
  res.status(200).json({
    success: true,
    hotels,
  });
});

//get all hotels by category
export const getAllHotelsByCategory = catchAsyncErrors(
  async (req, res, next) => {
    const categories = req.query.category.split(",");
    const hotels = await Promise.all(
      categories.map((category) => {
        return Hotel.find({ category });
      })
    );
    res.status(200).json({
      success: true,
      hotels,
    });
  }
);
