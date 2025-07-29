/// Match routes and call controller functions

// routes/notesRouter.js
const {
  getAllNotes,
  getNotesById,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controller/notesController");

const notesUUIDRegex = /^\/notes\/[0-9a-fA-F-]{36}$/;

const router = function (req, res) {
  const { url, method } = req;

  // Set response header
  res.setHeader("Content-Type", "application/json");

  let urlId = url.split("/")[2];

  if (url === "/notes" && method === "GET") {
    const allNotes = getAllNotes();

    // Respond with list of notes;
    res.statusCode = 200;
    res.end(JSON.stringify(allNotes));
  } else if (notesUUIDRegex.test(url) && method === "GET") {
    //fetch note
    const noteFetched = getNotesById(urlId);

    // respond with note if found
    if (noteFetched) {
      res.statusCode = 200;
      res.end(JSON.stringify(noteFetched));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Note Not Found" }));
    }
  } else if (url === "/notes" && method === "POST") {
    let body = "";

    // Listen for data chunks and collect
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert buffer to string
    });

    // All data recieved
    req.on("end", () => {
      try {
        const data = JSON.parse(body); // Parse the string

        console.log("Parsed data:", data);

        // create and get new note
        const newlyCreatedNote = createNewNote(data);

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
      body += chunk.toString(); // parse the
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        //update note
        const updatedNote = updateNote(data);

        //Respond with updated note
        res.statusCode = 201;
        res.end(JSON.stringify({ message: "Updated sucessfull", updatedNote }));
      } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.end(
          JSON.stringify({ error: "Couldn't update note. Please try again" })
        );
      }
    });
  } else if (notesUUIDRegex.test(url) && method === "DELETE") {
    deleteNote(urlId);

    res.statusCode = 201;
    res.end(JSON.stringify({ message: "Note deleted sucessfully" }));
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Not Found. Please check URL" }));
  }
};

module.exports = router;
