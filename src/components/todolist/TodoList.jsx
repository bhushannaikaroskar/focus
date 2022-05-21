import React, { useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import "./todolist.css";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");
    const [isModal, setIsModal] = useState("");
    const { state, addTask, removeTask, toggleTask } = useDashboard();

    const addTaskHandler = (event) => {
        if (event.charCode === 13) {
            if (text.trim() === "") {
                return;
            }
            addTask(text);
            setText("");
        }
    };

    const toggleModal = (index) => {
        if (isModal === index) {
            setIsModal("");
        } else {
            setIsModal(index);
        }
    };

    const deleteTask = (index) => {
        setTasks([...tasks.filter((_, i) => i !== index)]);
    };

    return (
        <div
            className="todo-list-container"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="todo-title">Todo List</div>
            <div className="todo-content">
                {state.tasks.length === 0 ? (
                    <div className="todo-message">
                        Add a todo to get started
                    </div>
                ) : (
                    <div className="todo-list">
                        {state.tasks.map((task, index) => {
                            return (
                                <div className="todo-item">
                                    <div className="todo-item-content">
                                        <label htmlFor={index}>
                                            <input
                                                id={index}
                                                type="checkbox"
                                                checked={task.isCompleted}
                                                onClick={() =>
                                                    toggleTask(index)
                                                }
                                            />{" "}
                                            {task.title}
                                        </label>
                                    </div>
                                    <button
                                        style={
                                            isModal === index
                                                ? { visibility: "visible" }
                                                : {}
                                        }
                                        className="todo-options-btn"
                                        onClick={() => {
                                            toggleModal(index);
                                        }}
                                    >
                                        <span class="material-icons">
                                            more_horiz
                                        </span>
                                        {isModal === index && (
                                            <div className="options-modal">
                                                <button
                                                    className="modal-options-btn"
                                                    onClick={() => {
                                                        removeTask(index);
                                                    }}
                                                >
                                                    <span className="material-icons">
                                                        delete
                                                    </span>
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="todo-input-container">
                <input
                    className="todo-input"
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        addTaskHandler(e);
                    }}
                />
            </div>
        </div>
    );
}
