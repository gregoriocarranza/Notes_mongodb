"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var TaskSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
  date: String
});
var TaskModel = mongoose.model('notes', TaskSchema);
module.exports = TaskModel;