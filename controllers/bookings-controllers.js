import { addBookingValidator } from "../validators/bookings-validators.js";
import { BookingModel } from "../models/bookings-models.js";
import { ServiceModel } from "../models/services-models.js";


// create a booking
export const addBooking = async (req, res, next) => {
    
    try {
        const { error, value } = addBookingValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
    
        
            const { serviceId, date, time } = req.body;
        
            // Check if the service exists
            const service = await ServiceModel.findById(serviceId);
            if (!service) {
              return res.status(404).json({ message: "Service not found" });
            }
    
            //add booking to database
            const booking = new BookingModel({
                service,
                date,
                time,
                user: req.user.id, // Assuming authentication middleware sets req.user
                provider: serviceId.provider, // Provider from the Service details
                status: "Pending",
              });
    
              await booking.save();
              res.status(201).json('Booking created successfully!', booking);
    } catch (error) {
       next(error); 
    }
};


// get all bookings for a user
export const getUserBookings = async (req, res, next) => {
    try {
        const userBookings = await BookingModel.find({ user: req.user.id }).populate('service');
        res.status(200).json(userBookings);
    } catch (error) {
        next(error);
    }
};

// get all bookings for a provider
export const getProviderBookings = async (req, res, next) => {
    try {
        const providerBookings = await BookingModel.find({ provider: req.user.id })
        .populate('service')
        .populate('user');
        res.status(200).json(providerBookings);
    } catch (error) {
        next(error);
    }
};


// count services
export const countBookings = async (req, res, next) => {

    try {
      const {filter= "{}"} = req.query
      // Count Advert in database
      const count = await BookingModel.countDocuments(JSON.parse(filter));
      // Respond to request
      res.json({count});
    } catch (error) {
     next (error);
    }
   };
