const express = require("express");
const path = require("path");
const fs = require("fs");
let stylesPath = path.join(__dirname, "../public");
const bodyParser = require("body-parser");

let app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/login-form", (req, res) => {
  fs.readFile("./form.json", (err, data) => {
    if (err) throw err;
    let obj = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(data);

    let jsonData = JSON.parse(data);
    jsonData.push(obj);
    fs.writeFileSync("./form.json", JSON.stringify(jsonData));

    res.send("Success!");
  });
});

app.get("/formsubmissions", (req, res) => {
  fs.readFile("./form.json", (err, data) => {
    if (err) throw err;
    let dataParse = JSON.parse(data);
    res.send(dataParse);
  });
});

app.use(express.static(stylesPath));

app.listen(3000);
