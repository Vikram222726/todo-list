const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  complete: {
    type: Boolean,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  completionDate: {
    type: String,
    required: true,
    default: Date.now,
  },
});

const Todo = mongoose.model("todo_list", todoSchema);

module.exports.Todo = Todo;
