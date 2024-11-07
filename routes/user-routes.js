import { Router } from "express";
import { getProfile, getUserServices, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user-controllers.js";
import { userAvatarUpload } from "../middleware/uploads.js";
import { hasPermission, isAuthenticated } from "../middleware/auth.js";

// Create router
const userRouter = Router();

// Define routes
userRouter.post("/users/register",registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, hasPermission ('get_user'), getProfile);

userRouter.get("/users/me/services", isAuthenticated, getUserServices);

userRouter.post("/users/logout",isAuthenticated,logoutUser);

userRouter.patch("/users/me", isAuthenticated, hasPermission ('update_profile'), userAvatarUpload.single('avatar'), updateProfile);

// export Router
export default userRouter;