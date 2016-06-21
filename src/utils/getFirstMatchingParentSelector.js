export default function getFirstMatchingParentSelector(elem, selectorList) {
    elem = elem.parentNode;
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (selectorList) {
            let parents = [];
            for(var i in selectorList) {
                let selector = selectorList[i];
                if (selector) {
                    var firstChar = selector.charAt(0);
                }
                // If selector is a class
                if (firstChar === '.') {
                    if (elem.classList.contains( selector.substr(1))) {
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
