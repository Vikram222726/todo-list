import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todoVal, setTodoVal] = useState("");
  const [error, setError] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(async () => {
    const list = await axios.get("https://todozlist.herokuapp.com/api/todo");
    setTodoList(list.data);
  }, []);

  const saveTodo = async () => {
    try {
      if (todoVal.length === 0) {
        setError("Please enter TODO field!");
        return;
      }

      let date = Date().split(" ");
      date = date[1] + " " + date[2] + " " + date[3];

      await axios.post("https://todozlist.herokuapp.com/api/todo", {
        name: todoVal,
        complete: false,
        creationDate: date,
      });

      window.location.reload();
    } catch (ex) {
      setError(ex.response !== undefined ? ex.response.data : ex.message);
    }
  };

  const getTodoValue = (e) => {
    setError("");
    setTodoVal(e.target.value);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todozlist.herokuapp.com/api/todo/${id}`);
      window.location.reload();
    } catch (ex) {
      setError(ex.response !== undefined ? ex.response.data : ex.message);
    }
  };

  const updateTodo = async (type, id, status) => {
    try {
      if (
        (type === "accept" && status === true) ||
        (type === "reject" && status === false)
      ) {
        return;
      }

      const result = await axios.put(
        `https://todozlist.herokuapp.com/api/todo/${id}`,
        {
          complete: !status,
        }
      );

      window.location.reload();
    } catch (ex) {
      setError(ex.response !== undefined ? ex.response.data : ex.message);
    }
  };

  return (
    <div className="todo__wrapper">
      <div className="todo__list">
        <div className="todo__header">Todos List</div>
        <div className="todo__notify">{error}</div>
        <div className="todo__input">
          <input
            type="text"
            placeholder="Enter your Todo"
            className="todo__text"
            size="39"
            onChange={getTodoValue}
          />
          <div className="todo__save" onClick={saveTodo}>
            Save
          </div>
        </div>
        <div className="todo__list__items">
          {todoList.map((list) => (
            <div
              className={
                list.complete === true
                  ? "todo__product"
                  : "todo__product todo__product__short"
              }
              key={list._id}
            >
              <div className="todo__name">{list.name}</div>
              <div className="todo__btn">
                <div
                  className={
                    list.complete === true
                      ? "todo__btn__accept"
                      : "todo__btn__accept todo__btn__accept__small"
                  }
                  onClick={() => updateTodo("accept", list._id, list.complete)}
                >
                  <i className="fas fa-check" />
                </div>
                <div
                  className={
                    list.complete === false
                      ? "todo__btn__reject"
                      : "todo__btn__reject todo__btn__accept__small"
                  }
                  onClick={() => updateTodo("reject", list._id, list.complete)}
                >
                  <i className="fas fa-times" />
                </div>
              </div>
              <div className="todo__createDate">{list.creationDate}</div>
              <div
                className={
                  list.complete === true
                    ? "todo__createDate"
                    : "todo__nocreateDate"
                }
              >
                {list.completionDate}
              </div>
              <div
                className="todo__delete"
                onClick={() => deleteTodo(list._id)}
              >
                <i className="fa fa-trash" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
