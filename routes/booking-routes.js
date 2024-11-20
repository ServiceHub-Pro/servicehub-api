import { Router } from "express";
import { addBooking, getUserBookings, getProviderBookings, countBookings } from "../controllers/bookings-controllers.js";
import { hasPermission, isAuthenticated } from "../middleware/auth.js";

const bookingRouter = Router();

// define routes
bookingRouter.post('/bookings', isAuthenticated, hasPermission('add_booking'), addBooking);

bookingRouter.get('/bookings/user', isAuthenticated, hasPermission('get_user_bookings'), getUserBookings);

bookingRouter.get('/bookings/provider', isAuthenticated, hasPermission('get_provider_bookings'), getProviderBookings);

bookingRouter.get('/bookings/count', isAuthenticated, hasPermission('get_booking_count'), countBookings);


export default bookingRouter;