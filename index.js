const http = require("http");

const router = require("./routes/notesRouter");

// create server
const server = http.createServer((req, res) => {
  router(req, res);
});

/// Start server on port 5000
const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server running at port 5000");
});
