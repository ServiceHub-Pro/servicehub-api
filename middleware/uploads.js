import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const  localUpload = multer({ dest: "uploads/"});

export const serviceIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/backend-api/services/*",
    }),
    preservePath: true
})

export const userAvatarUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/backend-api/users/*",
  }),
  preservePath: true  
})