import mongoose, { Document, Schema } from "mongoose";

// Task 1
export interface ICoin extends Document {
  coinId: string;
  coinName: string;
  currentPrice: number;
  marketCap: number;
  change_24h: number;
}

const coinSchema: Schema = new Schema(
  {
    coinId: { type: String, required: true },
    coinName: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change_24h: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CoinModel = mongoose.model<ICoin>("Coin", coinSchema);

export default CoinModel;
