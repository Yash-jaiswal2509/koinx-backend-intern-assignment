import { Router } from "express";
import CoinController from "../controllers/coin.controller";

const coinRouter = Router();

coinRouter.get("/", CoinController.fetchAndStoreCoins);
