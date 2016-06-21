(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './utils/getFirstMatchingParentSelector'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./utils/getFirstMatchingParentSelector'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.getFirstMatchingParentSelector);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _getFirstMatchingParentSelector) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _getFirstMatchingParentSelector2 = _interopRequireDefault(_getFirstMatchingParentSelector);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ReactClickHandler = function (_Component) {
        _inherits(ReactClickHandler, _Component);

        function ReactClickHandler(props) {
            _classCallCheck(this, ReactClickHandler);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactClickHandler).call(this, props));

            _this.selectorList = props.selectors.map(function (obj) {
                return obj.selector;
            });
            return _this;
        }

        _createClass(ReactClickHandler, [{
            key: '_handlePageClick',
            value: function _handlePageClick(e) {
                var _this2 = this;

                var firstMatch = (0, _getFirstMatchingParentSelector2.default)(e.target, this.selectorList),
                    focusStateToBeChanged = void 0;
                if (firstMatch) {
                    this.props.selectors.forEach(function (selectorObj) {
                        if (selectorObj.selector === firstMatch) {
                            focusStateToBeChanged = selectorObj.focusState;
                            if (selectorObj.toggle) {
                                _this2.props.setParentState(_defineProperty({}, selectorObj.focusState, !_this2.props.parentState[selectorObj.focusState]));
                            } else {
                                _this2.props.setParentState(_defineProperty({}, selectorObj.focusState, true));
                            }
                            if (selectorObj.sideEffect) {
                                selectorObj.sideEffect();
                            }
                        } else if (selectorObj.focusState !== focusStateToBeChanged) {
                            _this2.props.setParentState(_defineProperty({}, selectorObj.focusState, false));
                        }
                    });
                } else {
                    this.props.selectors.forEach(function (selectorObj) {
                        _this2.props.setParentState(_defineProperty({}, selectorObj.focusState, false));
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { className: this.props.wrapperClass, onClick: this._handlePageClick.bind(this) },
                    this.props.children
                );
            }
        }]);

        return ReactClickHandler;
    }(_react.Component);

    ReactClickHandler.propTypes = {
        wrapperClass: _react.PropTypes.string.isRequired,
        parentState: _react.PropTypes.object.isRequired,
        setParentState: _react.PropTypes.func.isRequired,
        selectors: _react.PropTypes.array.isRequired
    };

    exports.default = ReactClickHandler;
});