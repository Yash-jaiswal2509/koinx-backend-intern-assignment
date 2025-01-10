import { FilterQuery, UpdateQuery } from "mongoose";
import CoinModel, { ICoin } from "../models/coin.model";

// Task 1: CRUD operations
class CoinRepository {
  async createCoin(coin: ICoin): Promise<ICoin> {
    return await CoinModel.create(coin);
  }

  async getCoins(): Promise<ICoin[]> {
    return await CoinModel.find();
  }

  async getCoinById(coinId: string): Promise<ICoin | null> {
    return await CoinModel.findById(coinId).exec();
  }

  async updateCoin(
    coinId: string,
    coin: Partial<ICoin>
  ): Promise<ICoin | null> {
    return await CoinModel.findByIdAndUpdate(coinId, coin, {
      new: true,
    }).exec();
  }

  async deleteCoin(coinId: string): Promise<ICoin | null> {
    return await CoinModel.findByIdAndDelete(coinId).exec();
  }

  async getCoinByCoinId(coinId: string): Promise<ICoin | null> {
    return await CoinModel.findOne({ coinId }).exec();
  }

  async upsertCoin(
    query: FilterQuery<ICoin>,
    coin: UpdateQuery<ICoin>
  ): Promise<ICoin | null> {
    const result = await CoinModel.findOneAndUpdate(query, coin, {
      upsert: true,
      new: true,
    }).exec();

    return result as ICoin | null;
  }
}

export default new CoinRepository();
