import { Bet } from "../../models/bet/betModel";
import { Option } from '../../models/bet/optionModel';
import { UserBet } from "../../models/bet/userBetModel";

export async function getBets(req: any, res: any) {
    try {
      const bets = await Bet.find();
      res.send({bets});
    } catch (error) {
      res.status(500).send({error});
    }
  }

export async function getBetById(req: any, res: any) {
  const userId = req.user?._id;
  const betId = req.body.betId;

  if (!userId || !betId) {
    return res.status(400).json({ error: "Missing userId or betId" });
  }

  try {
    const bet = await Bet.findById(betId).populate("createdBy", "fullname email");
    if (!bet) return res.status(404).json({ error: "Bet not found" });

    const options = await Option.find({ Bet: betId });

    // Check if user already picked
    const userPick = await UserBet.findOne({ user: userId, bet: betId });

    return res.status(200).json({ bet, options, userPick });
  } catch (err) {
    console.error("Error fetching bet:", err);
    return res.status(500).json({ error: "Server error" });
  }
}


export const pickOption = async (req:any, res:any) => {
  console.log("got here");
  const userId = req.user?._id;
  const { betId, optionId } = req.body;
  console.log(optionId,"got hereeee");

  if (!userId || !betId || !optionId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingPick = await UserBet.findOne({ user: userId, bet: betId });
    if (existingPick) {
      return res.status(400).json({ error: "You have already picked an option for this bet." });
    }

    const newPick = new UserBet({ user: userId, bet: betId, option: optionId });
    await newPick.save();

    return res.status(200).json({ message: "Option picked successfully." });
  } catch (err) {
    console.error("Error saving pick:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
