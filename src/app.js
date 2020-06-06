const yargs = require('yargs');
const notes = require('./notes');

//Creating a command 
yargs.command({
    command: 'add', 
    describe: 'Add a new Note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string', 
        },
        body: {
            describe: 'body of the note',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a existing note',
    builder: {
        title: {
            describe: 'Title to be removed', 
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNotes(argv.title);
    }
});

yargs.command({
    command: 'list', 
    describe: 'List all the notes.',
    handler: function() {
        notes.getNotes();
    }
})

yargs.command({
    command: 'read', 
    describe: 'Read a particular node.', 
    handler(argv){
        notes.searchNote(argv.title);
    }
})

// console.log(yargs.argv);
yargs.parse();