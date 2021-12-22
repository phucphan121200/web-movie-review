const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/userRoute");
const countryRoute = require("./routes/countryRoute");
const productionRoute = require("./routes/productionRoute");
const categoryRoute = require("./routes/categoryRoute");
const castRoute = require("./routes/castRoute");
const movieRoute = require("./routes/movieRoute");
const characterRoute = require("./routes/characterRoute");
const reviewRoute = require("./routes/reviewRoute");
const favoriteRoute = require("./routes/favoriteRoute");
const genreRoute = require("./routes/genreRoute");
const postRoute = require("./routes/postRoute");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/countries", countryRoute);
app.use("/api/productions", productionRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/casts", castRoute);
app.use("/api/movies", movieRoute);
app.use("/api/characters", characterRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/genres", genreRoute);
app.use("/api/posts", postRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});
