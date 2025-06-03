import { Bet } from "../../models/bet/betModel";

export async function setBet(req: any, res: any) {
    try {
      const  {betDescription,expiresAt,options} =req.body;
      console.log(betDescription,expiresAt,options);
      const bet = new Bet({betDescription,expiresAt,options});
      await bet.save();
    } catch (error) {
      res.status(500).send({error});
    }
  }