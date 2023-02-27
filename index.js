//=========handling api==============
const https = require("https");
const url = "https://hexanovate-1oc3v5uf6-thephenom1708.vercel.app/api/movies";

var movies = [];

//==========Get all movies==============
const request = https.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    for (var i in body) movies.push(body[i]);
    // console.log(res);
    // for (var j = 0; j < movies.length; j++) {
    //   console.log(
    //     movies[j].title,
    //     movies[j].genre,
    //     movies[j].rated,
    //     movies[j].released
    //   );
    //   console.log("-----");
    // }
  });
});
request.on("error", (error) => {
  console.log("An error", error);
});
request.end();

//=========server====================
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//=========================================Routing=======================================
let MovieSearched = [];

//home get
app.get("/", (req, res) => {
  res.render("home", { movies: movies });
});

//home post
app.post("/home", (req, res) => {
  let movieName = req.body.movieSearch;

  MovieSearched = movies.filter(function (movie) {
    return (
      movie.title == movieName ||
      movie.rated == movieName ||
      movie.released == movieName ||
      movie.genre == movieName
    );
  });
  console.log(MovieSearched);
  res.redirect("SearchedMovie");
});

//movieSearched
app.get("/SearchedMovie", (req, res) => {
  res.render("SearchedMovie", { MovieSearched: MovieSearched });
});

app.listen(PORT, () => {
  console.log(`Listening to the port 3000`);
});
