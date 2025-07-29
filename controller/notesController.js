//  All logic: get, create, update, delete

const { v4: uuidv4 } = require("uuid");
const notes = require("../data/notesData");

// Get all notes
const getAllNotes = function () {
  return notes;
};

const getNotesById = function (id) {
  ///find note element that match id from reqeust
  noteId = id;
  return notes.find((e) => e.id === noteId);
};

// create store new note
const createNewNote = function (inputData) {
  data = inputData;
  const newNote = {
    id: uuidv4(), //"123e4567-e89b-12d3-a456-426614174002",
    title: data.title,
    body: data.body,
    createdAt: new Date().getTime(),
  };
  notes.push(newNote);
  console.log(newNote);
  return newNote;
};

////update existing note
const updateNote = function (updatedData) {
  const newUpdatedNote = updatedData;
  console.log(newUpdatedNote);
  //First find the notes to update
  const noteToWorkOn = notes.find((e) => e.id === newUpdatedNote.id);
  console.log(noteToWorkOn);
  //update the note
  noteToWorkOn.title = newUpdatedNote.title;
  noteToWorkOn.body = newUpdatedNote.body;
  noteToWorkOn.createdAt = `edited at: ${new Date().getTime()}`;
  return noteToWorkOn;
};

/// Delete note
const deleteNote = function (noteId) {
  const id = noteId;
  const noteToDelete = notes.findIndex((note) => note.id === id);
  console.log(noteToDelete);
  const deleted = notes.splice(noteToDelete, 1);
  console.log(deleted);
};

module.exports = {
  getAllNotes,
};
