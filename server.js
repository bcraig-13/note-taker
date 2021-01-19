const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const database = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(database);
});

app.post("/api/notes", (req, res) => {
  let finalDb = database.length - 1;
  let id;

  if (finalDb < 0) {
    id = 1;
  } else {
    id = database[finalDb]["id"] + 1;
  }

  database.push({ id, ...req.body });
  res.json(database);
  console.log(database);
});

app.delete("/api/notes/:id", (req, res) => {
  var noteToDelete = database.find(
    ({ id }) => id === JSON.parse(req.params.id)
  );

  database.splice(database.indexOf(noteToDelete), 1);
  console.log(database);
  res.end();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});
