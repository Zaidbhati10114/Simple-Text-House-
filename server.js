// Server
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const Document = require("./models/Document");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/textbin", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  const code = `Welcome to Simple Text House

Use the commands in the top right corner
to create a new file to share with others`;
  res.render("code-display", { code, language: "plain-text" });
});

app.get("/new", (req, res) => {
  res.render("new");
});

// Save texts

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (e) {
    res.render("new", { value });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value });
  } catch (e) {
    res.redirect("/");
  }
});

app.listen(3000);
