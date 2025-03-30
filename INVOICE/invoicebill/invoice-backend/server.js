import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import invoiceRoutes from "./routes/invoiceRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", invoiceRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
