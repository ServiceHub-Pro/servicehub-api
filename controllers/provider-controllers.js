import { loginProviderValidator, registerProviderValidator, updateProviderValidator } from "../validators/provider-validators.js";
import { ProviderModel } from "../models/provider-models.js";
import { ServiceModel } from "../models/services-models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js"; 


// Register, Login, Logout
export const registerProvider = async(req,res,next)=>{
    try {
        // Validate user input
        const {error, value} = registerProviderValidator.validate(req.body);
        if (error){
            return res.status(422).json(error);
        }
        // Check if user does not exist
        const provider = await ProviderModel.findOne({email: value.email});
        if (provider) {
            return res.status(409).json('User already exist!');
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        //Save the user into database
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'User Registration',
            text: 'Account Registered Successfully'
        });

        await ProviderModel.create({
            ...value,
            password: hashedPassword
        });
res.json({
    message:'User registered!'
});
        
    } catch (error) {
       next(error);
    }
}

export const loginProvider = async(req,res,next) => {
    try {
       const {error, value} = loginProviderValidator.validate(req.body);
       if(error){
        return res.status(422).json(error);
       }
    //Find one user with identifier
    const provider = await ProviderModel.findOne({email:value.email});
    if(!provider){
        return res.status(404).json
        ('User does not exist');
    }
    //Compare their passwords
    const correctPassword = bcrypt.compareSync(value.password, provider.password);
    if (!correctPassword){
        return res.status(401).json('Invalid Crendentials!');
    }
    // Sign a token for  user
    const token = jwt.sign(
        {id:provider.id}, 
        process.env.JWT_PRIVATE_KEY,
        {expiresIn:'24h' /* it can be 1d or 1m*/ }
    );

    // Respond to request
    res.json({
        message: 'User Logged In',
        accessToken: token
    });
    } catch (error) {
     next(error)   
    }
}

export const getProvider = async (req,res,next)=>{
    try {
        // Find authentication user from database
        const provider = await ProviderModel.findById(req.auth.id)
        .select({password: false});
         // Respond to request
         res.json(provider);
    } catch (error) {
       next(error) ;
    }
}

export const getProviderServices = async (req,res,next)=>{
    try {
        const { filter = "{}",sort="{}", limit = 20,
            skip = 0 } = req.query;
  
        // Fetch all Adverts from database
        const allServices = await ServiceModel.find({
            ...JSON.parse(filter),
            user: req.auth.id
        })
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);
        // return response
        res.status(200).json(allServices);
    } catch (error) {
       next(error) ;
    }
}

export const logoutProvider = (req,res,next)=>{
    res.json({
       message: 'User Logged Out!'
    });
}

export const updateProvider = async(req,res,next)=>{
try {
    // validate user input
    const {error,value} = updateProviderValidator.validate(req.body);
    if (error){
        return res.status(422).json(error);
    }
    await ProviderModel.findByIdAndUpdate(value);
    res.json('User Profile Updated!')
} catch (error) {
   next(error) 
}
}
