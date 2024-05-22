import express from "express";
import "dotenv/config";
import { dbConnection } from "./DB_Connection/Connection.js";
import { userRouter } from "./Routes/userRoutes.js";
import { todoRouter } from "./Routes/todoRoutes.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
dbConnection();

app.use("/", userRouter);
app.use("/", todoRouter);
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
