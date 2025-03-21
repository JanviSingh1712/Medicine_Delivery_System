require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./database");
mongoDB();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin to access the server
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"], // Allow these headers
  })
);

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
