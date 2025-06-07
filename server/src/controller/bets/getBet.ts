import { Bet } from "../../models/bet/betModel";

export async function getBets(req: any, res: any) {
    try {
      const bets = await Bet.find();
      res.send({bets});
    } catch (error) {
      res.status(500).send({error});
    }
  }