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
  // Task 1
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
        const coinInfo = {
          coinId,
          coinName: coinId,
          currentPrice: coinData.usd,
          marketCap: coinData.usd_market_cap,
          change_24h: coinData.usd_24h_change,
        };
        // console.log("Coin data:", coinInfo);
        if (coinData) {
          await CoinRepository.createCoin(coinInfo);
        }
      }
    } catch (error) {
      console.error("Error while fetching coins data:", error);
    }
  }

  public backGroundJob(): void {
    console.log("Starting background job to fetch and store coins data");
    this.fetchAndStoreCoins();
    nodeCron.schedule("0 */2 * * *", () => {
      console.log("Running background job to fetch and storing coins data");
      this.fetchAndStoreCoins();
    });
  }

  // Task 2
  public async getCoins(): Promise<ICoin[]> {
    return await CoinRepository.getCoins();
  }

  public async getCoinByCoinId(coinId: string): Promise<ICoin | null> {
    return await CoinRepository.getCoinByCoinId(coinId);
  }

  public async getStandardDeviation(coinId: string): Promise<number | null> {
    const records = await CoinRepository.getStandardDeviation(coinId);
    if (!records || records.length == 0) {
      return null;
    }

    const prices = records.map((record) => record.currentPrice);
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const squaredDifferences = prices.map((price) => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((a, b) => a + b, 0) / squaredDifferences.length;
    const standardDeviation = Math.sqrt(variance);
    
    return standardDeviation;
  }
}

export default new CoinService();
