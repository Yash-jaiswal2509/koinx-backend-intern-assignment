import { Request, Response, Router } from "express";
import CoinController from "../controllers/coin.controller";

const coinRouter = Router();

coinRouter.get("/", (req: Request, res: Response) => {
  res.send("Hi, welcome to my KoinX-backend-intern-assignment");
});

coinRouter.get("/stats", CoinController.getCoinById);

export default coinRouter;
