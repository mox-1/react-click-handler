(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.getFirstMatchingParentSelector = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = getFirstMatchingParentSelector;
    function getFirstMatchingParentSelector(elem, selectorList) {
        elem = elem.parentNode;
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (selectorList) {
                var parents = [];
                for (var i in selectorList) {
                    var selector = selectorList[i];
                    if (selector) {
                        var firstChar = selector.charAt(0);
                    }
                    // If selector is a class
                    if (firstChar === '.') {
                        if (elem.classList.contains(selector.substr(1))) {
                            parents.push(selector);
                        }
                    }

                    // If selector is an ID
                    if (firstChar === '#') {
                        if (elem.id === selector.substr(1)) {
                            parents.push(selector);
                        }
                    }

                    // If selector is a data attribute
                    if (firstChar === '[') {
                        if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
                            parents.push(selector);
                        }
                    }

                    // If selector is a tag
                    if (elem.tagName.toLowerCase() === selector) {
                        parents.push(selector);
                    }
                }
                if (parents.length) {
                    // break DOM traversal
                    return parents[0];
                }
            }
        }
        return false;
    };
});