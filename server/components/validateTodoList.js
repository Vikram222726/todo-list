const { Todo } = require("../models/todo_list");
const Joi = require("joi");

const postTodoValidator = async (req, res) => {
  try {
    const error = validateList(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // If any todo task with same name is listed earlier, then we'll send 400..
    const similarTodoTask = await Todo.findOne({ name: req.body.name });
    if (similarTodoTask) {
      return res
        .status(400)
        .send("Todo Task with this name is already listed!");
    }

    const newTodoList = new Todo({
      name: req.body.name,
      complete: req.body.complete,
      creationDate: req.body.creationDate,
    });

    await newTodoList.save();
    return res.send({ _id: newTodoList._id, name: newTodoList.name });
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
};

const putTodoValidator = async (req, res) => {
  try {
    if (req.body.complete === undefined) {
      return res.status(400).send("Unable to read the Todo Status");
    }
    let date = Date().split(" ");
    date = date[1] + " " + date[2] + " " + date[3];
    const result = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          complete: req.body.complete,
          completionDate: date,
        },
      },
      { new: true }
    );
    res.send(result);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
};

const deleteTodoValidator = async (req, res) => {
  try {
    const removedList = await Todo.findByIdAndDelete(req.params.id);
    res.send(removedList);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
};

const getTodoValidator = async (req, res) => {
  try {
    const result = await Todo.find();
    return res.json(result);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
};

const validateList = (list) => {
  if (list.name.length === 0) {
    return "Todo Task should not be empty!";
  } else if (list.complete === undefined) {
    return "Todo Status should be updated!";
  } else if (list.creationDate.length === 0) {
    return "Todo creation date must be specified!";
  } else {
    return null;
  }
};

module.exports.postTodoValidator = postTodoValidator;
module.exports.putTodoValidator = putTodoValidator;
module.exports.deleteTodoValidator = deleteTodoValidator;
module.exports.getTodoValidator = getTodoValidator;
