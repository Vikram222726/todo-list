const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const { todoRouter } = require("./routes/todo");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello Todo List API ");
});

const PORT = process.env.PORT || 8000;

const CONNECTION_URL = process.env.MONGO_URL;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Successfully connected to MongoDB on PORT ${PORT}`)
    )
  )
  .catch((ex) => {
    console.log(ex);
  });

mongoose.set("useFindAndModify", false);
