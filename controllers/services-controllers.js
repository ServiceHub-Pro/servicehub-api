import { ServiceModel } from "../models/services-models.js";
import { addServiceValidator, updateServiceValidator } from "../validators/services-validators.js";

// add a new service
export const addService = async (req, res, next) => {

try {   
        // check if user is logged in
        // validate user input
        const { error, value } = addServiceValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // write new service to database
        await ServiceModel.create(
            // value
            {
             ...value,
             user: req.auth.id 
            }   
        );
    
        res.status(201).json(value/*A new service has been added! */);
} catch (error) {
    next(error);
}

};


// get all services
export const getAllServices = async (req, res, next) => {

try {
    const {
        filter = '{}', sort = '{}', limit = 10,
         skip = 0 } = req.query;

        const allServices = await ServiceModel.find(JSON.parse(filter)).sort(JSON.parse(sort)).limit(limit).skip(skip);
    
        res.status(200).json(allServices);
} catch (error) {
    next(error);
}

};

// count services
export const countServices = async (req, res, next) => {

    try {
      const {filter= "{}"} = req.query
      // Count Advert in database
      const count = await ServiceModel.countDocuments(JSON.parse(filter));
      // Respond to request
      res.json({count});
    } catch (error) {
     next (error);
    }
   };

// get one service
   export const getOneService = async (req, res, next) => {

    try {
        const oneService = await ServiceModel.findById(req.params.id);
        res.status(201).json(oneService);

    } catch (error) {
        next(error);

    }
};

// update a service
export const updateService = async (req, res, next) => {
    try {
        const { error, value } = updateServiceValidator.validate({
            ...req.body,
            icon: req.file?.filename
        });

        if (error) {
            return res.status(422).json(error);
        }

      const serviceUpdate = await ServiceModel.// findByIdAndUpdate(req.params.id, value, {new:true});
      findOneAndUpdate({
       _id:req.params.id,
       user: req.auth.id}, value, {new: true});

       if (!serviceUpdate){
       return res.status(404).json('Service not found')
       } /*do same for the delete*/
        
      return res.json(value);
    } catch (error) {
        next(error);
    }
};

// delete a service
export const deleteService  = async (req, res, next) => {
    try {
        const serviceDelete = await ServiceModel./*findByIdAndDelete(req.params.id);*/
        findOneAndDelete({
            _id:req.params.id,
            user: req.auth.id}/*, value, {new: true}*/);
            if (!serviceDelete){
            return res.status(404).json('Service not deleted !')
            }
            return res.status(200).json('Service deleted successfully!')
        }
      
     catch (error) {
        next(error);
    }
};
