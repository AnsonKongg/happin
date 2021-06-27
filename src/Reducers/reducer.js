import * as types from "../config/actionTypes";
const userState = {
    actionType: "",
    errorMessage: "",
    isLoading: false,
    cityList: [],
    bookList: [],
};
const reducer = (state = userState, action) => {
    switch (action.type) {
        case types.GET_CITIES_LIST:
            return {
                ...state,
                actionType: action.type,
                errorMessage: "",
                isLoading: true,
            };
        case types.GET_CITIES_LIST_SUCCESS:
            return {
                ...state,
                actionType: action.type,
                isLoading: false,
                cityList: action.cityList,
            };
        case types.GET_CITIES_LIST_FAILED:
            return {
                ...state,
                actionType: action.type,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        case types.GET_BOOKS_LIST:
            return {
                ...state,
                actionType: action.type,
                errorMessage: "",
                isLoading: true,
            };
        case types.GET_BOOKS_LIST_SUCCESS:
            return {
                ...state,
                actionType: action.type,
                isLoading: false,
                bookList: action.bookList,
            };
        case types.GET_BOOKS_LIST_FAILED:
            return {
                ...state,
                actionType: action.type,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
}

export default reducer;