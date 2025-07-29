/// In-memory data store

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

module.exports = notes;
