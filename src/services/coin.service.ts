import axios from "axios";
import { ICoin } from "../models/coin.model";
import CoinRepository from "../repositories/coin.repository";
import nodeCron from "node-cron";
interface CoingeckoApiResponse {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_change: number;
  };
}
class CoinService {
  private COINS = ["bitcoin", "ethereum", "matic-network"];
  private COINGECKO_API_URL = process.env.COINGECKO_API_URL as string;
  private params = {
    ids: this.COINS.join(","),
    vs_currencies: "usd",
    include_market_cap: true,
    include_24hr_change: true,
  };

  public async fetchAndStoreCoins(): Promise<void> {
    try {
      const response = await axios.get<CoingeckoApiResponse>(
        this.COINGECKO_API_URL + "/simple/price/",
        {
          params: this.params,
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.COINGECKO_API_KEY as string,
          },
        }
      );

      const data = response.data;
      for (const coinId of this.COINS) {
        const coinData = data[coinId];
        if (coinData) {
          await CoinRepository.upsertCoin(
            { coinId },
            {
              coinId,
              coinName: coinId,
              currentPrice: coinData.usd,
              marketCap: coinData.usd_market_cap,
              change_24h: coinData.usd_24h_change,
              lastUpdated: new Date(),
            }
          );
        }
      }

      console.log("Coins data updated successfully.");
    } catch (error) {
      console.error("Error while fetching coins data:", error);
    }
  }

  public async getCoins(): Promise<ICoin[]> {
    return await CoinRepository.getCoins();
  }

  public backGroundJob(): void {
    console.log("Starting background job to fetch and store coins data");
    this.fetchAndStoreCoins();
    nodeCron.schedule("0 */2 * * *", () => {
      console.log("Running background job to fetch and storing coins data");
      this.fetchAndStoreCoins();
    });
  }
}

export default new CoinService();
