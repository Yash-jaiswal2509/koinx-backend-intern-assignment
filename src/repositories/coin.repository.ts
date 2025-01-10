import CoinModel, { CoinSchema } from "../models/coin.model";

// Task 1: CRUD operations
class CoinRepository {
  async createCoin(coin: CoinSchema): Promise<CoinSchema> {
    return await CoinModel.create(coin);
  }

  async getCoins(): Promise<CoinSchema[]> {
    return await CoinModel.find();
  }

  async getCoinById(coinId: string): Promise<CoinSchema | null> {
    return await CoinModel.findById(coinId).exec();
  }

  async updateCoin(
    coindId: string,
    coin: CoinSchema
  ): Promise<CoinSchema | null> {
    return await CoinModel.findByIdAndUpdate(coindId, coin, {
      new: true,
    }).exec();
  }

  async deleteCoin(coinId: string): Promise<CoinSchema | null> {
    return await CoinModel.findByIdAndDelete(coinId).exec();
  }
}

export default new CoinRepository();
