/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const path = require('path');
const produceRouter = require("./routes/produceRouter");
const indexRouter = require("./routes/index");
const categoryRouter = require("./routes/categories");
const handleNotFoundError = require("./utilis/errorhandling/middlewares/notFoundError");
const handleGlobalError = require("./utilis/errorhandling/middlewares/globalError");

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/produce", produceRouter);
app.use("/categories", categoryRouter);
app.use("/", indexRouter);

app.use(handleNotFoundError);
app.use(handleGlobalError);

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on ${PORT}`));
