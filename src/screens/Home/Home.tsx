import React, { useState } from "react";

import "./styles.css";

type TodoItem = {
  id: number;
  text: string;
  isChecked: boolean;
};

export function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [filterType,setFilterType] =  useState<"all"|"completed"|"uncompleted">("all")
  const [inputError, setInputError] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setInputError(false);
  };

  const handleAddButtonClick = () => {
    if (inputText.trim() !== "") {
      const newTodo: TodoItem = {
        id: new Date().getTime(),
        text: inputText,
        isChecked: false,
      };
      setTodoList([...todoList, newTodo]);
      setInputText("");
    }
    else {
      alert("please input your mission!");
    }
  };

  const handleFilterTypeChange = (type: "all" | "completed" | "uncompleted") => {
    setFilterType(type);
  };

const filteredTodoList = todoList.filter((todo) => {
  if (filterType === "completed") {
    return todo.isChecked;
  } else if (filterType === "uncompleted") {
    return !todo.isChecked;
  } else {
    return true;
  }
});

return (
  <div className="container">
    <div className="header">
      <h1 className="title">My to-do list</h1>
      <h2 className="subTitle">Lets do it!</h2>
    </div>
    <div className="form">
      <input
        placeholder="my to-do list"
        type="text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleAddButtonClick}>+</button>
      {<div className="error">Please enter a task.</div>}
    </div>
    <div className="filterButtonsContainer">
      <button
        className={filterType === "all" ? "active" : ""}
        onClick={() => handleFilterTypeChange("all")}
      >
        All
      </button>
      <button
        className={filterType === "uncompleted" ? "active" : ""}
        onClick={() => handleFilterTypeChange("uncompleted")}
      >
        Uncompleted
      </button>
      <button
        className={filterType === "completed" ? "active" : ""}
        onClick={() => handleFilterTypeChange("completed")}
      >
        Completed
      </button>
    </div>
    <div className="todoListsContainer">
      <ul>
        {filteredTodoList.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => {
                  const updatedTodoList = todoList.map((t) => {
                    if (t.id === todo.id) {
                      return { ...t, isChecked: !t.isChecked };
                    } else {
                      return t;
                    }
                  });
                  setTodoList(updatedTodoList);
                }}
              />
              <span className={todo.isChecked ? "completed" : ""}>
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}

//   return (
//     <div className="container">
//       <div className="header">
//         <h1 className="title">My to-do list</h1>
//         <h2 className="subTitle">Lets do it!</h2>
//       </div>
//       <div className="form">
//         <input
//           placeholder="my to-do list"
//           type="text"
//           value={inputText}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleAddButtonClick}>+</button>
//       </div>
//       <div className="todoListsContainer">
//         <ul>
//           {todoList.map((todo) => (
//             <li key={todo.id}>
//               <input type="checkbox" checked={todo.isCompleted} />
//               {todo.text}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
