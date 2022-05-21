export const initialDashboardState = {
    user: "",
    mainFocus: {
        isCompleted: false,
        text: "",
    },
    tasks: [],
};

export const dashBoardReducer = (state, action) => {
    switch (action.type) {
        case "ADD_USER":
            return { ...state, user: action.payload.userName };
        case "ADD_FOCUS":
            return {
                ...state,
                mainFocus: {
                    ...state.mainFocus,
                    text: action.payload.mainFocus,
                },
            };
        case "TOGGLE_FOCUS":
            return {
                ...state,
                mainFocus: {
                    ...state.mainFocus,
                    isCompleted: action.payload.flag,
                },
            };
        case "RESET_FOCUS":
            return { ...state, mainFocus: { isCompleted: false, text: "" } };
        case "ADD_TASK":
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        title: action.payload.taskName,
                        isCompleted: false,
                    },
                ],
            };
        case "REMOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(
                    (task, index) => index !== action.payload.index
                ),
            };
        case "TOGGLE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task, index) =>
                    (index === action.payload.index)
                        ? { ...task, isCompleted: !task.isCompleted }
                        : task
                ),
            };
        default:
            return state;
    }
};
