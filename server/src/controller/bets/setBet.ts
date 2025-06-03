import { Bet } from "../../models/bet/betModel";

export async function setBet(req: any, res: any) {
    try {
        console.log("got here");
         console.log(req.body);
      const  {betDescription,expiresAt,options} =req.body;
       //const createdBy = req.user.userId;
       console.log(req.user.userId);
      console.log(betDescription,expiresAt,options,"what");
      const bet = new Bet({betDescription,expiresAt,options});
      await bet.save();
    } catch (error) {
      res.status(500).send({error});
    }
  }