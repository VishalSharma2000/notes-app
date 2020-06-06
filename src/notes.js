const fs = require('fs');
const table = require('console.table')
const chalk = require('chalk');

function getNotes() {
    const notes = loadNotes();

    if(notes.length == 0) 
        console.log("No notes exists.");
    else{
        console.log("\nNotes are as follow: ");
        console.table(notes);
    } 
        
}

const addNotes = (title, body) => {
    const notes = loadNotes();          //array of objects notes

    //checking for duplicate titles
    //filter() method creates a new array, with the elements which pass the test function
    const duplicateNote = notes.find((note) => note.title.toLowerCase() === title.toLowerCase());

    //if their is no element in duplicateNotes 
    if(!duplicateNote) {
        let newNote = {
            title: title,
            body: body
        }
        notes.push(newNote);
        saveNotes(notes);
        console.log(chalk.green("Notes Added!"));
    } else {
        console.log("A note with title = " + title  + " already exits");
    }
}

// accessing the existing notes in notes.js
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');   
        //if file does not exist then the control will go to catch block
        const data = dataBuffer.toString();
        return JSON.parse(data);
    } catch (e) {
        return [];      //returning an empty array if their is no notes or notes.js does not exist
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes);
    fs.writeFileSync('notes.json', data);
}

const removeNotes = (title) => {
    const notes = loadNotes();

    let index = notes.findIndex((note) => note.title.toLowerCase() === title.toLowerCase());
    // .splice(starting_index, no. of elements to be deleted)
    if(index == -1) console.log(chalk.bgRed("Note not found"));
    else{
        notes.splice(index, 1);         // removing the note

        saveNotes(notes);
        console.log(chalk.green('Note Removed'));
    } 
}

const searchNote = (title = "") => {
    const notes = loadNotes();

    let rqnote = notes.find((note) => {
        return note.title.toLowerCase() === title.toLowerCase();
    })

    if(!rqnote) console.log(chalk.red("Note does not exist."));
    else {
        console.log("\ntitle: \t" + rqnote.title);
        console.log("body: \t" + rqnote.body);
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    searchNote: searchNote
};