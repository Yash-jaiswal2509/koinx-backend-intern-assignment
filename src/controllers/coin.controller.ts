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
        .json({ coins, message: "Coins created successfully." });
    } catch (error) {
      console.error("Error fetching and storing coins:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public getCoinById = async (req: Request, res: Response): Promise<void> => {
    try {
      const coinId = req.query.id as string;
      const coin = await CoinService.getCoinByCoinId(coinId);
      if (coin) {
        res.status(200).json({ coin });
      } else {
        res.status(404).json({ message: "Coin not found" });
      }
    } catch (error) {
      console.error("Error fetching coin by id:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default new CoinController();
