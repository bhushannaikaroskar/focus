import React, { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import "./dashboard.css";

export default function Dashboard() {
    const { state, addMainFocus } = useDashboard();
    const [inputText, setInputText] = useState("");
    const [dateString, setDateString] = useState("");

    const mainFocusHandler = (event) => {
        console.log(event);
        if (event.charCode === 13) {
            addMainFocus(inputText);
        }
    };

    const timeHandler = ()=>{
        const date = new Date();
            const string = `${date.getHours()} : ${
                date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes()
            }`;
            setDateString(string);
    }

    useEffect(() => {
        timeHandler()
        const interval = setInterval(() => {
            timeHandler()
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
                    <div class="mainfocus-container">
                        <input
                            class="task-checkbox"
                            id="main-focus"
                            type="checkbox"
                        />
                        <label
                            class="task-checkbox-label"
                            for="main-focus"
                        ></label>
                        <div class="mainfocus-text">{state.mainFocus.text}</div>
                    </div>
                )}
            </div>
            <div className="footer"></div>
        </div>
    );
}
