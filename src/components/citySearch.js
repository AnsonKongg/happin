import { notification, Empty, AutoComplete } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../Actions/index';
import * as actionTypes from '../config/actionTypes';
const { Option } = AutoComplete;

class CitySearch extends Component {
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
            if (this.props.actionType === actionTypes.GET_CITIES_LIST_FAILED) {
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
            if (!!this.props.cityList && this.props.cityList.length > 0) {
                return this.props.cityList.map(city => <Option key={city}>{city}</Option>)
            } else {
                return <Option key="empty"><Empty /></Option>
            }
        }
    };

    render() {
        return (
            <>
                <AutoComplete
                    style={{ width: "100%" }}
                    onSelect={this._handleSelect}
                    onSearch={this._handleSearch}
                    placeholder="Searching cities"
                >
                    {this._renderOptions()}
                </AutoComplete>
            </>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return ({
        actionType: state.reducer.actionType,
        isLoading: state.reducer.isLoading,
        errorMessage: state.reducer.errorMessage,
        cityList: state.reducer.cityList,
    })
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    onGetOptions(io_data) {
        dispatch(action.getCityOptions(io_data))
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitySearch);
