const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve to client
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "SAM SHETH",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the help page",
    title: "Help",
    name: "SAM",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    bio: "Software Developer",
    title: "About",
    name: "SAM SHETH",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
    return;
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({ error });
        return;
      }

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          res.send({ error });
          return;
        }
        
        res.send({
          forecast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
    return;
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    error: "Help Article Not Found",
    name: "SAM SHETH",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    error: "Page Not Found",
    name: "SAM SHETH",
  });
});

app.listen(port, () => {
  console.log("Express App is listening on port 3000");
});
