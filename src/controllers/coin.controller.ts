import { Request, Response } from "express";
import CoinService from "../services/coin.service";

export { ICoin } from "../models/coin.model";

class CoinController {
  public fetchAndStoreCoins = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      await CoinService.fetchAndStoreCoins();
      const coins = await CoinService.getCoins();
      res
        .status(200)
        .json({ coins, message: "Coins data updated successfully." });
    } catch (error) {
      console.error("Error fetching and storing coins:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default new CoinController();
