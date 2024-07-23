import express from "express";
import "./Dataconnect/Connect.js";
import authRouter from "./routes/authRoutes.js";
import userRouer from "./routes/userRoute.js";
import appointmentRouter from "./routes/appointment.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/user", userRouer);
app.use("/appointment", appointmentRouter);

const port = 8000;

app.listen(port, () => {
  console.log(`port is running in ${port}`);
});
