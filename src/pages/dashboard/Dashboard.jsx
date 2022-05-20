import React, { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import "./dashboard.css";

export default function Dashboard() {
    const { state,dispatch, addMainFocus, toggleMainFocus } = useDashboard();
    const [inputText, setInputText] = useState("");
    const [dateString, setDateString] = useState("");
    const [isModal, setIsModal] = useState(false);

    const mainFocusHandler = (event) => {
        if (event.charCode === 13) {
            addMainFocus(inputText);
        }
    };

    const timeHandler = () => {
        const date = new Date();
        const string = `${date.getHours()} : ${
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`;
        setDateString(string);
    };

    useEffect(() => {
        timeHandler();
        const interval = setInterval(() => {
            timeHandler();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <div className="header"></div>
            <div className="main">
                <div className="current-time">{dateString}</div>
                <div className="welcome-message">Good morning, Bhushan</div>
                {!state.mainFocus.text ? (
                    <>
                        <h1 className="input-header">
                            What's your main focus for today
                        </h1>
                        <input
                            className="input-focus"
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={mainFocusHandler}
                        />
                    </>
                ) : (
                    <div className="mainfocus-container">
                        <input
                            className="task-checkbox"
                            id="main-focus"
                            type="checkbox"
                            value={state.mainFocus.isCompleted}
                            onClick={()=>toggleMainFocus(state.mainFocus.isCompleted)}
                        />
                        <label
                            className="task-checkbox-label"
                            htmlFor="main-focus"
                        ></label>
                        <div className="mainfocus-text">
                            {state.mainFocus.text}
                        </div>
                        <button style={isModal?{visibility:"visible"}:{}} className="options-btn" onClick={()=>{setIsModal(s=>!s)}}>
                            <span class="material-icons">more_horiz</span>
                            {isModal && (
                                <div className="options-modal">
                                    <button className="modal-options-btn" onClick={()=>{
                                        if(state.mainFocus.isCompleted){
                                            setInputText("")
                                        }
                                        dispatch({type:"RESET_FOCUS"})
                                    }}>
                                        <span className="material-icons">
                                            edit
                                        </span>
                                        {state.mainFocus.isCompleted
                                            ? "New task"
                                            : "Edit"}
                                    </button>
                                </div>
                            )}
                        </button>
                    </div>
                )}
            </div>
            <div className="footer"></div>
        </div>
    );
}
