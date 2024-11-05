import { Router } from "express";
import { addService, countServices, deleteService, getAllServices, getOneService, updateService } from "../controllers/services-controllers.js";
import { serviceIconUpload } from "../middleware/uploads.js";
import { hasPermission, isAuthenticated } from "../middleware/auth.js";

const serviceRouter = Router();

// define routes
serviceRouter.post("/services", isAuthenticated,hasPermission('add_service'), serviceIconUpload.single("icon"), addService);

serviceRouter.get("/services",  getAllServices);

serviceRouter.get("/services/count", isAuthenticated, hasPermission('count_services'), countServices);

serviceRouter.get("/services/:id", getOneService);

serviceRouter.patch("/services/:id", isAuthenticated, hasPermission( 'update_service') ,serviceIconUpload.single("icon"), updateService);

serviceRouter.delete("/servides/:id", isAuthenticated, hasPermission('delete_service'),deleteService);

// Export router
export default serviceRouter;
