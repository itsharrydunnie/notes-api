const http = require("http");
const { v4: uuidv4 } = require("uuid");

const notes = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000", // hardcoded UUID // uuidv4()
    title: "First Note",
    content: "This is the first note.",
    createdAt: Date.now(),
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    title: "Second Note",
    content: "This is the second note.",
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
    /// Respond with a note ID
    // Get ID
    const urlId = url.split("/")[2];

    ///get note element that match particular id

    const noteFetched = notes.find((e) => e.id === urlId);

    // respond with note
    res.statusCode = 200;
    res.end(JSON.stringify(noteFetched));
  } else if (url === "/notes" && method === "POST") {
    let body = "";

    // Listen for data chunks
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

        const processData = function (inputData) {
          // give the data an id and date created
          inputData.id = uuidv4();
          inputData.createdAt = new Date().getTime();
          console.log(inputData);
          notes.push(inputData);
        };
        processData(data);
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Note created", data }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
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
      req.on("end", () => {
        const data = JSON.parse(body);
        const noteToWorkOn = notes.find((e) => e.id === data.id);
        const updateNote = function (updatedData) {
          updatedData.title;
        };
      });
    } catch (error) {}
  }
});

/// Start server on port 5000

const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server running at port 5000");
});
