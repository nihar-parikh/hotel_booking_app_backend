import express from "express";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

//Route imports
import userRouters from "./routes/user.js";
import hotelRouters from "./routes/hotel.js";
import roomRouters from "./routes/room.js";

app.use("/api/v1", userRouters);
app.use("/api/v1", hotelRouters);
app.use("/api/v1", roomRouters);

//middleware for error
app.use(errorMiddleware); //using errorMiddleware

export default app;
