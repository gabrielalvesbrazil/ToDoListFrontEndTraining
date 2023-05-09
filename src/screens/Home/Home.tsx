import React, { useState } from "react";

import "./styles.css";
import { TodoItem } from "../../types/TodoItemsTypes";
import { ToDo } from "../../components/ToDo/ToDo";
import DELETE from "../../assets/delete.svg";

export function Home() {
    const [inputText, setInputText] = useState<string>("");
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [filterTypes, setFilterType] = useState<string>("all");

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
        } else {
            alert("Please input your task name");
        }
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
        console.log(todoList);
    };

    const handleFilter = (filter: string) => {
        setFilterType(filter);
    };

    const handleDeleteButtonClick = (id: number) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    };

    const filteredTodoList = () => {
        if (filterTypes === "completed") {
            return todoList.filter((todo) => todo.isCompleted);
        } else if (filterTypes === "incomplete") {
            return todoList.filter((todo) => !todo.isCompleted);
        } else {
            return todoList;
        }
    };

    const handleInputTextChange = (event: any, id: number) => {
        // const updatedTodoList = todoList.filter((todo) => todo.id === id)[0];
        // updatedTodoList?.text = event.target.value;
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
                    placeholder="my to-do list"
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button
                    className="submit-button"
                    onClick={handleAddButtonClick}
                >
                    +
                </button>
            </div>

            <div
                className="filter-container"
                style={{ display: "flex", marginTop: "20px" }}
            >
                <button
                    className="filter-button"
                    onClick={() => handleFilter("all")}
                >
                    Dispaly All
                </button>
                <button
                    className="filter-button"
                    onClick={() => handleFilter("incomplete")}
                >
                    Dispaly inComplete
                </button>
                <button
                    className="filter-button"
                    onClick={() => handleFilter("completed")}
                >
                    Dispaly completed
                </button>
            </div>
            <div className="todoListsContainer">
                <ul>
                    {filteredTodoList().map((todo) => (
                        <ToDo
                            id={todo.id}
                            text={todo.text}
                            isCompleted={todo.isCompleted}
                            handleChange={() => handleCheckboxChange(todo.id)}
                            handleInputTextChange={(event: any) =>
                                handleInputTextChange(event, todo.id)
                            }
                        >
                            <button
                                id="delete"
                                onClick={() => handleDeleteButtonClick(todo.id)}
                            >
                                <img src={DELETE} alt="delete" />
                            </button>
                        </ToDo>
                    ))}
                </ul>
            </div>
        </div>
    );
}
