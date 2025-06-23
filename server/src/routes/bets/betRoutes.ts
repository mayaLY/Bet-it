import express from "express";

import { getUserBetStats } from "../../controller/bets/getUserBetStats";
import { setBet } from "../../controller/bets/setBet";
import { getBetById, getBets, hasPicked, pickOption, setCorrectOption } from "../../controller/bets/getBet";
import { checkUser } from "../../controller/middlewares/loginMid";


const router = express.Router();



router.post("/getStats",checkUser, getUserBetStats);
router.post("/setBet",checkUser, setBet);
router.post("/getBetById", checkUser, getBetById);
router.post("/getBets", checkUser, getBets);
router.post("/pickOption", checkUser, pickOption);
router.post("/hasPicked", checkUser, hasPicked);
router.post("/setCorrectOption", checkUser, setCorrectOption);



export default router;