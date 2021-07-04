const express = require("express");
const router = express.Router();
const {
  postTodoValidator,
  putTodoValidator,
  deleteTodoValidator,
  getTodoValidator,
} = require("../components/validateTodoList");

router.get("/", getTodoValidator);

router.post("/", postTodoValidator);

router.put("/:id", putTodoValidator);

router.delete("/:id", deleteTodoValidator);

module.exports.todoRouter = router;
