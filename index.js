const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

//Init middleware
// app.use(logger);

//Handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage Router
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API routes

app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
