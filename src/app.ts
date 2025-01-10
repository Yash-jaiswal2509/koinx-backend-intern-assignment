import express, { Application, Request, Response } from "express";
import "dotenv/config";
import coinRouter from "./routes/coin.routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to My KoinX-assignmet" });
});

export default app;
