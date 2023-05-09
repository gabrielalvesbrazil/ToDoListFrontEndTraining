import React, { useState } from "react";

import "./styles.css";
import { TodoItem } from "../../types/TodoItemsTypes";

export function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (inputText.trim() !== "") {
      const newTodo: TodoItem = {
        id: new Date().getTime(),
        text: inputText,
        isCompleted: false,
      };
      setTodoList([...todoList, newTodo]);
      setInputText("");
    }
    alert("Please input your task name");
  };

  const handleCheckboxChange = (id: number) => {
    const updateTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    setTodoList(updateTodoList);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">My to-do list</h1>
        <h2 className="subTitle">Lets do it!</h2>
      </div>
      <div className="form">
        <input
          id="taskInput"
          placeholder="Create your task"
          type="text"
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={handleAddButtonClick}>+</button>
      </div>
      <div className="todoListsContainer">
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
