import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Security headers (helps mitigate XSS and other attacks)
app.use(helmet());

// JSON body parsing
app.use(express.json());

// Strict CORS configuration to only allow known frontend origin
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

// API routes
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port: ${PORT}`);
});
