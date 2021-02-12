const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readFile("db/db.json", "utf-8")
  }
  write(note) {
   return writeFile("db/db.json", JSON.stringify(note))
  }
  parseNotes() {
    return this.read().then(rawNotes => {
      let notesArray; 
      try {
        notesArray = [].concat(JSON.parse(rawNotes))
      } catch (error) {
        notesArray = [];
      }
      
      return notesArray;
    })
  }
  createNote(note) {
    const { title,text } = note;
    const newNote = {title, text, id: uuidv4()}

    return this.parseNotes().then(notesArray => [...notesArray, newNote]).then(newNoteArray => this.write(newNoteArray)).then(() => newNote)
  }
  deleteNote(id) {
    return this.parseNotes().then(notesArray => notesArray.filter(note => note.id !== id)).then(updatedArray => this.write(updatedArray))
  }
}

module.exports = new Notes();