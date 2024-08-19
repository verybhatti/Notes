const Note = require('../models/noteModel');
const mongoose = require('mongoose');
//get all Notes
const getNotes = async (req, res) => {
    const notes = await Note.find({}).sort({createdAt: 1});
    res.status(200).json(notes);
}

//get a single Note
const getNote = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such note exists"});
    }
    const note = await Note.findById(id);
    if(!note){
        return res.status(400).json({error: "Note doesnt exist"});
    }

    res.status(200).json({note});
}

//create a new Note
const createNote = async (req, res) => {
    const {title, description} = req.body;
    try {
        const newNote = await Note.create({title, description});
        res.status(200).json(newNote);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a Note
const deleteNote = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such note exists'});
    }
    const note = await Note.findOneAndDelete({_id: id});
    if (!note) {
        res.status(404).json({error: 'No such note exists'});
    }

    res.status(200).json({note});
}

//update a Note
const updateNote = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such note exists'});
    }

    const note = await Note.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!note) {
        return res.status(404).json({error: 'No such note exists'});
    }
    res.status(200).json(note);
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote
}