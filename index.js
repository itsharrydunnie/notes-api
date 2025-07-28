const http = require("http");
const { v4: uuidv4 } = require("uuid");

const notes = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000", // hardcoded UUID // uuidv4()
    title: "First Note",
    body: "This is the first note.",
    createdAt: Date.now(),
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    title: "Second Note",
    body: "This is the second note.",
    createdAt: Date.now(),
  },
];

// console.log(notes[0].id);
// create server

const server = http.createServer((req, res) => {
  const { url, method } = req;

  const notesUUIDRegex = /^\/notes\/[0-9a-fA-F-]{36}$/;
  // Set response header
  res.setHeader("Content-Type", "application/json");

  if (url === "/notes" && method === "GET") {
    // Respond with list of notes;
    res.statusCode = 200;
    res.end(JSON.stringify(notes));
  } else if (notesUUIDRegex.test(url) && method === "GET") {
    // Get ID from URL
    const urlId = url.split("/")[2];

    ///find note element that match id from reqeust
    const noteFetched = notes.find((e) => e.id === urlId);

    // respond with note if found
    if (noteFetched) {
      res.statusCode = 200;
      res.end(JSON.stringify(noteFetched));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Note Not Found" }));
    }
  } else if (url === "/notes" && method === "POST") {
    let body = "";

    // Listen for data chunks and collect
    req.on("data", (chunk) => {
      console.log(chunk);
      body += chunk.toString(); // convert buffer to string
    });

    // All data recieved
    req.on("end", () => {
      try {
        const data = JSON.parse(body); // Parse the string

        console.log("Parsed data:", data);

        /// store to notes array, give it an ID, and the time it was created
        const newlyCreatedNote = processData(data);

        res.statusCode = 201;
        res.end(JSON.stringify({ message: "Note created", newlyCreatedNote }));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        console.log(error);
      }
    });
  } else if (notesUUIDRegex.test(url) && method === "PUT") {
    /// handle edited notes
    let body = "";

    /// Listen to data
    req.on("data", (chunk) => {
      body = +chunk.toString(); // parse the
    });
    console.log(body);
    try {
      let updatedNote;
      req.on("end", () => {
        const data = JSON.parse(body);

        ///
        updatedNote = updateNote(data);
      });

      //Respond with updated note
      res.statusCode = 201;
      res.end(JSON.stringify({ message: "Updated sucessfull", updatedNote }));
    } catch (error) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({ error: "Couldn't update note. Please try again" })
      );
      console.log(error);
    }
  }
});

////Function working on data
// create store new data
const processData = function (inputData) {
  const newNote = inputData;
  // give the data an id and date created
  newNote.id = uuidv4(); //"123e4567-e89b-12d3-a456-426614174002"
  newNote.createdAt = new Date().getTime();
  console.log(newNote);
  notes.push(newNote);
  return newNote;
};

////update existing note

const updateNote = function (updatedData) {
  //First find the notes to update
  const noteToWorkOn = notes.find((e) => e.id === updatedData.id);
  //update the note
  noteToWorkOn.title = updatedData.title;
  noteToWorkOn.body = updatedData.body;
  return noteToWorkOn;
};

/// Start server on port 5000

const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server running at port 5000");
});
