import express from "express";

import { getUserSurveyStats } from "../../controller/bets/getUserBetStats";



const router = express.Router();



router.post("/getStats", getUserSurveyStats);


export default router;