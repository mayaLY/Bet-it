import express from "express";
import { login, register } from "../../controller/users/setUser";
import { getUser } from "../../controller/users/getUser";



const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.get("/getUser", getUser);


export default router;