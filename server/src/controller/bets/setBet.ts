import { Bet } from "../../models/bet/betModel";

export async function setBet(req: any, res: any) {
    try {
      const  {createdAt,betDescription,createdBy,expiresAt} =req.body;
      console.log(createdAt,betDescription,createdBy,expiresAt);
      const bet = new Bet({createdAt,betDescription,createdBy,expiresAt});
      await bet.save();
    } catch (error) {
      res.status(500).send({error});
    }
  }