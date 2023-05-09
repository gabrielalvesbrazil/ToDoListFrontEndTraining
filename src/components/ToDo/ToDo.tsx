import { TodoItem } from "../../types/TodoItemsTypes";
import "./todo.css";
import DELETE from "../../assets/delete.svg";
import EDIT from "../../assets/edit.svg";
import { useState } from "react";

type todo = TodoItem & {
    handleChange: any;
    handleInputTextChange: any;
    children: string | JSX.Element | JSX.Element[];
};

export function ToDo({
    id,
    isCompleted,
    handleChange,
    text,
    children,
    handleInputTextChange,
}: todo) {
    let [isEdit, setIsEdit] = useState(false);
    const handleEditButton = () => {
        setIsEdit(!isEdit);
    };

    return (
        <li key={id}>
            <input
                className=""
                type="checkbox"
                checked={isCompleted}
                onChange={handleChange}
                id={id.toString()}
            />
            <span
                style={{
                    textDecoration: isCompleted ? "line-through" : "none",
                    marginLeft: "5px",
                    marginRight: "5px",
                    maxWidth: "300px",
                    wordBreak: "break-all",
                }}
            >
                {isEdit ? (
                    <input
                        type="text"
                        value={text}
                        onChange={handleInputTextChange}
                    />
                ) : (
                    <label htmlFor={id.toString()}>{text}</label>
                )}
            </span>
            <button id="delete">
                <img src={EDIT} alt="delete" onClick={handleEditButton} />
            </button>
            {children}
        </li>
    );
}
