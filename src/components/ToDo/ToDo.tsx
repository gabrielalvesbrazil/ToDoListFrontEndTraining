import React from "react";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { CompleteButton } from "../CompleteButton/CompleteButton";
import { TodoItem } from "../../types/TodoItemsTypes";
import { type } from "os";

export function ToDo(todo: TodoItem) {
    return (
        <li key={todo.id}>
            <input type="checkbox" checked={todo.isCompleted} />
            {todo.text}
        </li>
    );
}
