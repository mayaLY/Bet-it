import express from "express";

import { getUserBetStats } from "../../controller/bets/getUserBetStats";
import { setBet } from "../../controller/bets/setBet";


const router = express.Router();



router.post("/getStats", getUserBetStats);
router.post("/setBet", setBet);



export default router;