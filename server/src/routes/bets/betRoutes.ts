import express from "express";

import { getUserBetStats } from "../../controller/bets/getUserBetStats";
import { setBet } from "../../controller/bets/setBet";
import { getBetById } from "../../controller/bets/getBet";


const router = express.Router();



router.post("/getStats", getUserBetStats);
router.post("/setBet", setBet);
router.post("/getBetById", getBetById);



export default router;