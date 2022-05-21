import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
    dashBoardReducer,
    initialDashboardState,
} from "./reducers/dashBoardReducer";

const DashboardContext = createContext();

export default function DashboardProvider({ children }) {
    const [state, dispatch] = useReducer(
        dashBoardReducer,
        JSON.parse(localStorage.getItem("focus-user-data")) ||
            initialDashboardState
    );

    const addUser = (userName) => {
        dispatch({ type: "ADD_USER", payload: { userName } });
    };

    const addMainFocus = (text = "") => {
        if (text?.length !== 0) {
            dispatch({ type: "ADD_FOCUS", payload: { mainFocus: text } });
        }
    };

    const toggleMainFocus = () => {
        if (state.mainFocus.isCompleted) {
            dispatch({ type: "TOGGLE_FOCUS", payload: { flag: false } });
        } else {
            dispatch({ type: "TOGGLE_FOCUS", payload: { flag: true } });
        }
    };

    const addTask = (text = "") => {
        if(text.length !== 0){
            dispatch({type:"ADD_TASK",payload:{taskName: text}})
        }
    }

    const removeTask = (index = -1) => {
        dispatch({type:"REMOVE_TASK", payload: {index} })
    }

    
    const toggleTask = (index = -1) => {
        dispatch({type:"TOGGLE_TASK", payload: {index: index} })
    }

    useEffect(() => {
        localStorage.setItem("focus-user-data", JSON.stringify(state));
    }, [state]);

    return (
        <DashboardContext.Provider
            value={{ state, addUser, dispatch, addMainFocus, toggleMainFocus, addTask, removeTask,toggleTask }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => useContext(DashboardContext);
