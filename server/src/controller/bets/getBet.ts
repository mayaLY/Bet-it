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
export async function getBetById(req:any, res:any) {
   const { betId } = req.body;

  if (!betId) return res.status(400).json({ message: "betId is required" });

  try {
    const bet = await Bet.findById(betId).populate('createdBy', 'fullname');
    if (!bet) return res.status(404).json({ message: "Bet not found" });

    const options = await Option.find({ Bet: betId });

    res.status(200).json({ bet, options });
  } catch (err) {
    console.error("Error fetching bet:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
}
  