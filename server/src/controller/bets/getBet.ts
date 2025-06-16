import { Bet } from "../../models/bet/betModel";
import { Option } from '../../models/bet/optionModel';

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
  console.log(userId,"got hereee");
  
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const latestBet = await Bet.findOne({ _id: userId });
      
      console.log(latestBet,"bettt");

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
