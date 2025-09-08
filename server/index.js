import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { initDB } from "./db.js";
import { requestLogger } from "./utils/logger.js";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 5000);

async function main() {
  try {
    console.log("Starting backend...");
    await initDB();
    console.log("Database initialized.");

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(requestLogger);

    app.get("/", (req, res) => res.send("Marketplace API running ✅"));
    app.use("/products", productsRouter);
    app.use("/users", usersRouter);

    app.listen(PORT, HOST, () => {
      console.log('Server running on http://' + HOST + ':' + PORT);
    });
  } catch (err) {
    console.error("Fatal error during startup:", err);
    process.exit(1);
  }
}

main();
