const NoteModel = require("../models/noteModel")
const mongoose = require("mongoose")

const createNote = async (req,res) => {

    const {title, description} = req.body

    try{
        const note = await NoteModel.create({title, description})
        res.status(200).json(note)
    }
    catch(err){
        res.status(400).json({err: error.message})
    }
}

const getNotes = async (req,res) => {
    const notes = await NoteModel.find()
    res.status(200).json(notes)
}

const getNote = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "This id is invalid "})
    }

    const note = await NoteModel.findById(id)

    if(!note){
        return res.status(404).json({err: "Id not found!"})
    }

    res.status(200).json(note)
}

const deleteNote = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "This id is invalid!"})
    }

    const note = await NoteModel.findOneAndDelete({_id: id})

    if(!note){
        return res.status(404).json({err: "Note not found!"})
    }

    res.status(202).json(note)
}

const updateNote = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "This id is invalid!"})
    }

    const note = await NoteModel.findOneAndUpdate({_id: id}, {
        ...req.body
    },{new:true})

    if(!note){
        return res.status(404).json({err: "Note not found!"})
    }

    res.status(202).json(note)
}

module.exports = {
    createNote, getNotes, getNote, deleteNote, updateNote
}