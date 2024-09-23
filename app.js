require("dotenv").config();
const express = require("express");
const produceRouter = require("./routes/produceRouter");
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", produceRouter);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
