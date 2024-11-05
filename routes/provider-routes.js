import { Router } from "express";
import { getProvider, getProviderServices, loginProvider, logoutProvider, registerProvider, updateProvider } from "../controllers/provider-controllers.js";
import { providerAvatarUpload } from "../middleware/uploads.js";
import { hasPermission, isAuthenticated } from "../middleware/auth.js";

// Create router
const providerRouter = Router();

// Define routes
providerRouter.post("/providers/register",registerProvider);

providerRouter.post("/providers/login", loginProvider);

providerRouter.get("/providers/me", isAuthenticated, hasPermission ('get_provider'), getProvider);

providerRouter.get("/providers/me/services", isAuthenticated, getProviderServices);

providerRouter.post("/providers/logout",isAuthenticated,logoutProvider);

providerRouter.patch("/providers/me", isAuthenticated, hasPermission ('update_provider'), providerAvatarUpload.single('avatar'), updateProvider);

// export Router
export default providerRouter;