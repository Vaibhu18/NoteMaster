import express from "express";
const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send("first route");
});

app.listen(port, () => {
  console.log("Server is started");
});
