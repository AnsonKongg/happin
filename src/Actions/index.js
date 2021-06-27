import * as APIs from "../config/APIs";
import * as types from "../config/actionTypes";

export const getCityOptions = (io_data) => {
    return async dispatch => {
        dispatch({
            type: types.GET_CITIES_LIST,
        });
        try {
            const response = await fetch(APIs.GET_CITIES_LIST)
            const resData = await response.json();
            const cityList = [];
            if (!!io_data.searchValue && io_data.searchValue.length >= 3) {
                resData.forEach(element => {
                    if (element.startsWith(io_data.searchValue)) {
                        cityList.push(element)
                    }
                });
            }
            dispatch({
                type: types.GET_CITIES_LIST_SUCCESS,
                cityList,
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: types.GET_CITIES_LIST_FAILED,
                errorMessage: "Network Error",
            });
        }
    }
}
export const getBookOptions = (io_data) => {
    return async dispatch => {
        dispatch({
            type: types.GET_BOOKS_LIST,
        });
        try {
            const response = await fetch(APIs.GET_BOOKS_LIST)
            const resData = await response.json();
            const bookList = [{ label: "Title", options: [] }, { label: "Author", options: [] }];
            if (!!io_data.searchValue && io_data.searchValue.length >= 3) {
                resData.forEach(element => {
                    if (element.title.toUpperCase().startsWith(io_data.searchValue.toUpperCase())) {
                        bookList[0].options.push({value: element.title})
                    }
                    if (element.author.toUpperCase().startsWith(io_data.searchValue.toUpperCase())) {
                        bookList[1].options.push({value: element.author})
                    }
                });
            }
            dispatch({
                type: types.GET_BOOKS_LIST_SUCCESS,
                bookList,
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: types.GET_BOOKS_LIST_FAILED,
                errorMessage: "Network Error",
            });
        }
    }
}