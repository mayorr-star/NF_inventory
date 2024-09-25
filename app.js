require("dotenv").config();
const express = require("express");
const path = require('path');
const produceRouter = require("./routes/produceRouter");
const indexRouter = require("./routes/index");
const handleNotFoundError = require("./utilis/errorhandling/middlewares/notFoundError");

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/produce", produceRouter);
app.use("/", indexRouter);

app.use(handleNotFoundError);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
