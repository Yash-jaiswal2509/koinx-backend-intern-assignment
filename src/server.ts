import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";
import CoinService from "./services/coin.service";

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");

    CoinService.backGroundJob();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
