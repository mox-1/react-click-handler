/*
This component expects to receive an array of selector objects of the form:
{
    selector: (a STRING representing the element we want to attach a focus handler on)
    focusState: (a STRING indicating the state property that deals with this element's focus)
    toggle: (a BOOLEAN indicating whether this element toggles focus, or just sets it)
    sideEffect: (an optional FUNCTION to be called when this element is clicked)
}

When a click event occurs, this component calls the given handlers for the selector that is CLOSEST in the DOM tree to the event source.
The associated focus property is either TOGGLED or set to TRUE.
All other focus properties on the page are set to FALSE.
*/

import React, { Component, PropTypes } from 'react';
import getFirstMatchingParentSelector from 'common/utils/getFirstMatchingParentSelector';

class PageClickHandler extends Component {

    static propTypes = {
        wrapperClass: PropTypes.string.isRequired,
        parentState: PropTypes.object.isRequired,
        setParentState: PropTypes.func.isRequired,
        selectors: PropTypes.array.isRequired
    }

    componentWillMount() {
        this.setState({
            selectorList: this.props.selectors.map((obj)=>(obj.selector))
        });
    }

    _handlePageClick = (e) => {
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

export default PageClickHandler;
