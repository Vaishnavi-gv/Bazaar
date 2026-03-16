import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Allow both localhost and 127.0.0.1 (browsers treat them as different origins)
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

// Security headers – crossOriginResourcePolicy allows API responses to be loaded cross-origin
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// JSON body parsing
app.use(express.json());

// CORS – allow frontend origins
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/payments", paymentRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port: ${PORT}`);
});
