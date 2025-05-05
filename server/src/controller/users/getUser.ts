import { Bet } from "../../models/bet/betModel";
import { User } from "../../models/user/userModel";


export async function getUser(req: any, res: any) {
    try {
        const userId = req.userId;
        console.log(userId);
        const user = await User.findById(userId);
        if(user){
            res.status(200).send({user:user});
        }
        else{
            res.status(401).send({error:'User not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function getUserBets(req: any, res: any) {
    try {
      //user id
      const userId = req.userId;
      console.log("getUserPets", userId);

      const pets = await Bet.find({client:userId});
      console.log(pets)
      
      res.send({ok:true, pets});
    } catch (error) {
        console.error(error);
        res.status(500).send({error});
    }
}