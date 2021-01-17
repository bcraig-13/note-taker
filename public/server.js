const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    return res.json(notes);
});
// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
    const newnote = req.body;
  
    console.log(newnote);
    notes.push(newnote);
    res.json(newnote);
    //===Still need to create a notes array var
});
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a 
// unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and 
// then rewrite the notes to the db.json file.

//===Takes user to index if nothing is added to url. Keep last?
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
//   });

app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});
