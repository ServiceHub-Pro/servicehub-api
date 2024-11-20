import express from "express";
import mongoose from "mongoose";
import serviceRouter from "./routes/services-routes.js";
import userRouter from "./routes/user-routes.js";
import bookingRouter from "./routes/booking-routes.js";
import cors from "cors";


// create express app
const app = express(); 

// connect app to database
await mongoose.connect(process.env.MONGO_URI);

// use middlewares
app.use(cors());
app.use(express.json());

// use routes
app.use(serviceRouter);
app.use(userRouter);
app.use(bookingRouter);

// listen for incoming requests
app.listen(3200, () => {
    console.log('App is listening on port 3200');
});
