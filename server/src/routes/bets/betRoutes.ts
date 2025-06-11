import express from "express";

import { getUserBetStats } from "../../controller/bets/getUserBetStats";
import { setBet } from "../../controller/bets/setBet";
import { getBetById } from "../../controller/bets/getBet";
import { checkUser } from "../../controller/middlewares/loginMid";


const router = express.Router();



router.post("/getStats", getUserBetStats);
router.post("/setBet", setBet);
router.post("/getBetById", checkUser, getBetById);



export default router;