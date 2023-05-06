import express from "express";

import {  register, getMyProfile,login,logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
//import {User} from "../models/user.js";

const router = express.Router();

//router.get("/all", getAllUsers);




router.post("/new",register);
router.post("/login",login);
router.post("/login",login);

router.post("/logout",logout);


//router.get("/userid/special",specialFunction);

router.get("/me",isAuthenticated, getMyProfile)
//.put( UpdateUser ).delete(deleteUser)


  //router.get("/userid/:id",getUserDetails);
  //router.put("/userid/:id", UpdateUser );
 // router.delete("/userid/:id", deleteUser);






export default router;
