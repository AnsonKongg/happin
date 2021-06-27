import { notification, Empty, AutoComplete } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../Actions/index';
import * as actionTypes from '../config/actionTypes';

class BookSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        }
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.actionType !== prevProps.actionType) {
            if (this.props.actionType === actionTypes.GET_BOOKS_LIST_FAILED) {
                notification['error']({
                    message: 'Error',
                    description: `${this.props.errorMessage}.`
                });
            }
        }
    }
    _handleSelect = (value, option) => {
        this.setState({ searchValue: value })
    };
    _handleSearch = (value) => {
        this.props.onGetOptions({ searchValue: value })
        this.setState({ searchValue: value })
    };
    _renderOptions = () => {
        if (!!this.state.searchValue && this.state.searchValue.length >= 3) {
            if ((!!this.props.bookList[0] && this.props.bookList[0].options.length > 0) || (!!this.props.bookList[1] && this.props.bookList[1].options.length > 0)) {
                return this.props.bookList
            } else {
                return [{ value: <Empty /> }]
            }
        }
    };

    render() {
        return (
            <>
                <AutoComplete
                    options={this._renderOptions()}
                    style={{ width: "100%" }}
                    onSelect={this._handleSelect}
                    onSearch={this._handleSearch}
                    placeholder="Searching books"
                />
            </>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return ({
        actionType: state.reducer.actionType,
        isLoading: state.reducer.isLoading,
        errorMessage: state.reducer.errorMessage,
        bookList: state.reducer.bookList,
    })
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    onGetOptions(io_data) {
        dispatch(action.getBookOptions(io_data))
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookSearch);
