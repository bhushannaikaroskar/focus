import React, { useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import "./welcomepage.css";

export default function WelcomePage() {
    const [name, setName] = useState();
    const [error, setError] = useState();
    const { addUser } = useDashboard();

    const updateName = (event) => {
        if (event.charCode === 13) {
            if (name.length >= 2) {
                addUser(name);
            } else {
                setError("Please enter a valid name");
                setTimeout(() => setError(""), 5000);
            }
        }
    };

    return (
        <div className="welcomepage">
            <h1>What's your name?</h1>
            <input
                className="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={updateName}
            />
            <div className="error-text">{error}</div>
        </div>
    );
}
