import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import { ConnectDb } from "./lib/db";
dotenv.config({ quiet: true });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  ConnectDb();
});
