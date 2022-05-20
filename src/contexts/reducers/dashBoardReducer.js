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
};
