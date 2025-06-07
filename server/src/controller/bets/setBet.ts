import { Bet } from '../../models/bet/betModel';
import { Option } from '../../models/bet/optionModel';

export async function setBet(req:any, res:any) {
  try {
    const { betDescription, expiresAt, options } = req.body;

    const bet = new Bet({ betDescription, expiresAt });
    await bet.save();

    const createdOptions = await Promise.all(
      options.map((opt: string) => {
        const option = new Option({ optionDescription: opt, Bet: bet._id });
        return option.save();
      })
    );

    res.status(201).json({ bet, options: createdOptions });
  } catch (error) {
    console.error("Error creating bet:", error);
    res.status(500).json({ message: "Failed to create bet" });
  }
}
