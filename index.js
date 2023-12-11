import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./connectDB.js";
import appRoutes from "./routes/appRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/',(req, res) => {
//     res.send("This is a Cross Platform Application Launcher!!!")
// })

app.use('/uploads', express.static('uploads'));
app.use('/apps', appRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
