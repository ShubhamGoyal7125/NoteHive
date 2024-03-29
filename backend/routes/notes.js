const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../modules/Notes');
const { body, validationResult } = require('express-validator'); //used to check the validity of input note given by user


// ROUTE 1: Getting the details/notes of loggedin-user using: GET "/api/notes/fetchallnotes" - Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Adding a new note using: POST "/api/notes/addnote" - Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 3 characters long.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {

    
    try {
        //Checking errors, if error occurs, it returns a bad request with an error message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title, description, tag} = req.body;
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });
        // console.log(note.user.toString());
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Upadate a note using: PUT "/api/notes/updatenote/:id" - Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const {title, description, tag} = req.body;
        // Create a new Note object
        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

        // Find the note to be updated and Upadate it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        // Allow updation only if the user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
        

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Delete an existing note using: DELETE "/api/notes/updatenote/:id" - Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // Find the note to be deleted and Delete it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if the user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
        

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;