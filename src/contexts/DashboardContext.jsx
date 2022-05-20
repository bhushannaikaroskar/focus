import React, { createContext, useContext, useEffect, useReducer } from "react";

const DashboardContext = createContext();

const initialDashboardState = {
    user: "",
    mainFocus: {
        isCompleted:false,
        text:""
    },
    tasks: [],
};

export default function DashboardProvider({ children }) {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_USER":
                return { ...state, user: action.payload.userName };
            case "ADD_FOCUS":
                return { ...state, mainFocus: {...state.mainFocus,text: action.payload.mainFocus} };
            case "ADD_TASK":
                return {
                    ...state,
                    tasks: state.tasks.push({
                        _id: 1,
                        title: action.payload.taskName,
                        isCompleted: false,
                    }),
                };
            case "REMOVE_TASK":
                return {
                    ...state,
                    tasks: state.tasks.filter(
                        (task) => task._id === action.payload._id
                    ),
                };
            default:
                return state;
        }
    }, JSON.parse(localStorage.getItem("focus-user-data"))|| initialDashboardState);

    const addUser = (userName) => {
        dispatch({type:"ADD_USER",payload:{userName}})
    }

    const addMainFocus = (text="")=>{
        if((text?.length !== 0)){
            dispatch({type:"ADD_FOCUS",payload:{mainFocus:text}})
        }   
    }

    useEffect(()=>{
        localStorage.setItem("focus-user-data",JSON.stringify(state));
    },[state])

    return (
        <DashboardContext.Provider value={{ state, addUser, dispatch, addMainFocus }}>
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => useContext(DashboardContext);
