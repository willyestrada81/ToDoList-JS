const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let newItems = [];
let workItems = [];
let day = date.getDate();


app.get("/", (req, res) => {
  res.render("list", { today: day, newItems: newItems, listName: "Welcome" });
});

app.post("/", (req, res) => {

  let newItem = req.body.item;
console.log(req.body.list)
  if (req.body.list === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    newItems.push(newItem);
    res.redirect("/");
  }

 
});

app.get("/work", (req, res) => {
  res.render("list", { today: day, newItems: workItems, listName: "Work" });
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
