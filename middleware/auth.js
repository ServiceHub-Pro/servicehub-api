import { expressjwt } from "express-jwt";
import { ProviderModel } from "../models/provider-models.js";
import { permissions } from "../utils/rbac.js";


export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
});

export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            // Find user from database
            const provider = await ProviderModel.findById(req.auth.id);
            // Use the user role to find their permission
            const permission = permissions.find(value => value.role === provider.role);
            if (!permission) {
                return res.status(403).json('No permission found!');
            }
            // Check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed');
            }
        } catch (error) {
            next(error);
        }
    }
}