import express from "express";
import { router } from "./Routes/userRoutes.js";
import { dbConnection } from "./DB_Connection/Connection.js";

const app = express();
app.use(express.json());

const port = 4000;
dbConnection();

app.use("/", router);
app.listen(port, () => {
  console.log("Server is started");
});
