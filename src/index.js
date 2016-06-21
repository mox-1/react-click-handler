import React, { Component, PropTypes } from 'react';
import getFirstMatchingParentSelector from 'utils/getFirstMatchingParentSelector';

class ReactClickHandler extends Component {
    componentWillMount() {
        this.setState({
            selectorList: this.props.selectors.map((obj)=>(obj.selector))
        });
    }
    _handlePageClick(e) {
        let firstMatch = getFirstMatchingParentSelector(e.target, this.state.selectorList),
            focusStateToBeChanged;
        if (firstMatch) {
            this.props.selectors.forEach((selectorObj) => {
                if (selectorObj.selector === firstMatch) {
                    focusStateToBeChanged = selectorObj.focusState;
                    if (selectorObj.toggle) {
                        this.props.setParentState({
                            [selectorObj.focusState]: !this.props.parentState[selectorObj.focusState]
                        });
                    } else {
                        this.props.setParentState({
                            [selectorObj.focusState]: true
                        });
                    }
                    if (selectorObj.sideEffect) {
                        selectorObj.sideEffect();
                    }
                } else if (selectorObj.focusState !== focusStateToBeChanged){
                    this.props.setParentState({
                        [selectorObj.focusState]: false
                    });
                }
            });
        } else {
            this.props.selectors.forEach((selectorObj) => {
                this.props.setParentState({
                    [selectorObj.focusState]: false
                });
            });
        }
    }
    render() {
        return (
            <div className={this.props.wrapperClass} onClick={this._handlePageClick}>{this.props.children}</div>
        );
    }
}

ReactClickHandler.propTypes = {
    wrapperClass: PropTypes.string.isRequired,
    parentState: PropTypes.object.isRequired,
    setParentState: PropTypes.func.isRequired,
    selectors: PropTypes.array.isRequired
}

export default ReactClickHandler;
