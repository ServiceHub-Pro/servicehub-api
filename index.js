import express from "express";
import mongoose from "mongoose";
import serviceRouter from "./routes/services-routes.js";
import providerRouter from "./routes/provider-routes.js";
import cors from "cors";

// set up port
const PORT = 4500;

// create express app
const app = express(); 

// connect app to database
await mongoose.connect(process.env.MONGO_URI);

// use middlewares
app.use(cors());
app.use(express.json());

// use routes
app.use(serviceRouter);
app.use(providerRouter);

// listen for incoming requests
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
