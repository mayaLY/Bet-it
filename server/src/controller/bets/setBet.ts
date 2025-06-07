import { Bet } from "../../models/bet/betModel";


export async function setBet(req: any, res: any) {
  try {
    const { betDescription, expiresAt, options } = req.body;

    const bet = new Bet({ betDescription, expiresAt, options });
    await bet.save();

    res.status(201).json({ bet });

  } catch (error) {
    res.status(500).json({ message: "Failed to create bet", error });
  }
}