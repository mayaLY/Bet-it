import { Bet } from "../../models/bet/betModel";
import { Option } from '../../models/bet/optionModel';
import { UserBet } from "../../models/bet/userBetModel";
import { Types } from "mongoose";

type BetType = {
  _id: string;
  betDescription: string;
  expiresAt: string;
  createdBy?: {
    _id: string;
    username?: string;
  } | null;
};
export async function getBets(req: any, res: any) {
    try {
      const userId = req.user?._id;
      const bets = await Bet.find({createdBy:userId});
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

export const hasPicked = async (req:any, res:any) => {
  try {
    const userId = req.user._id;
    const { betId } = req.params;

    const existing = await UserBet.findOne({ user: userId, bet: betId })
      .populate('option')
      .lean();

    if (!existing) {
      return res.json({ picked: false });
    }

    return res.json({
      picked: true,
      optionDescription: (existing.option as any)?.optionDescription || null,
    });
  } catch (err) {
    console.error('hasPicked error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const setCorrectOption = async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const { betId, optionId } = req.body;

    const bet = await Bet.findById(betId);

    if (!bet) return res.status(404).json({ error: 'Bet not found' });

    // 👇 Fix safely accessing `createdBy`
    const createdById = ((): string | null => {
      if (!bet.createdBy) return null;

      if (typeof bet.createdBy === 'string') return bet.createdBy;
      if (bet.createdBy instanceof Types.ObjectId) return bet.createdBy.toString();
      if (typeof bet.createdBy === 'object' && '_id' in bet.createdBy) {
        return (bet.createdBy as any)._id?.toString() ?? null;
      }

      return null;
    })();

    if (!createdById || createdById !== userId.toString()) {
      return res.status(403).json({ error: 'Only the creator can set the correct option' });
    }

    // ✅ Safe expiration check
    const expiresAt = bet.expiresAt ? new Date(bet.expiresAt) : null;
    if (!expiresAt || expiresAt > new Date()) {
      return res.status(400).json({ error: 'Bet has not expired yet' });
    }

    // ✅ Update user picks with correct answer
   await UserBet.updateMany(
  { bet: betId },
  [
    {
      $set: {
        isCorrect: {
          $eq: ['$option', { $toObjectId: optionId }],
        },
      },
    },
  ]
);

    return res.json({ message: 'Correct option set successfully' });
  } catch (err) {
    console.error('setCorrectOption error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
