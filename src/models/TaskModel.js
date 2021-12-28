const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
    date: String
})
const TaskModel = mongoose.model('notes', TaskSchema)


module.exports = TaskModel

