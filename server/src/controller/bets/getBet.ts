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
  
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
     const latestBet = await Bet.findOne({ createdBy: userId })
      .sort({ createdAt: -1 })
      .populate("createdBy", "fullname email");

    if (!latestBet) {
      return res.status(404).json({ message: "No bets found for this user" });
    }

    const options = await Option.find({ Bet: latestBet._id });

    return res.status(200).json({ bet: latestBet, options });
  } catch (err) {
    console.error("Error fetching latest bet:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export const pickOption = async (req:any, res:any) => {
  const userId = req.user?._id;
  const { betId, optionId } = req.body;

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
