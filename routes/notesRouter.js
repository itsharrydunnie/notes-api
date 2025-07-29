///# Match routes and call controller functions

const notesUUIDRegex = /^\/notes\/[0-9a-fA-F-]{36}$/;

const router = function (req, res) {
  const { url, method } = req;

  // Set response header
  res.setHeader("Content-Type", "application/json");

  if (url === "/notes" && method === "GET") {
    const allNotes = getAllNotes();
    // Respond with list of notes;
    res.statusCode = 200;
    res.end(JSON.stringify(notes));
  } else if (notesUUIDRegex.test(url) && method === "GET") {
    // Get ID from URL
    const urlId = url.split("/")[2];

    // respond with note if found
    noteFetched = ge;
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
    console.log(body);
    try {
      req.on("end", () => {
        const data = JSON.parse(body);

        ///
        let updatedNote = updateNote(data);
        //Respond with updated note
        res.statusCode = 201;
        res.end(JSON.stringify({ message: "Updated sucessfull", updatedNote }));
      });
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.end(
        JSON.stringify({ error: "Couldn't update note. Please try again" })
      );
    }
  } else if (notesUUIDRegex.test(url) && method === "DELETE") {
    const urlId = url.split("/")[2];
    deleteNote(urlId);

    res.statusCode = 201;
    res.end(JSON.stringify({ message: "Note deleted sucessfully" }));
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Not Found. Please check URL" }));
  }
};

module.exports = router;
