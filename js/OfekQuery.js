const selectorFilters = {
    id: filterById,
    class: filterByClass,
    tag: filterByTag
};

const deep = true;

function findSelectorType(selector) {
    if (selector.startsWith("#")) {
        return 'id';
    } else if (selector.startsWith(".")) {
        return 'class';
    } else {
        return 'tag';
    }
}

function filterByTag(elements, selector) {
    return elements.filter(function (elem) {
        return elem.tagName === selector.toUpperCase();
    });
}

function filterById(elements, selector) {
    return elements.filter(function (elem) {
        return elem.id === selector.substring(1);
    });
}

function filterByClass(elements, selector) {
    return elements.filter(function (elem) {
        return elem.classList.contains(selector.substring(1));
    });
}

function expandTree(elements) {
    function addChildren(elem) {
        if (elem.children.length) {
            Array.from(elem.children).forEach(function (childElem) {
                expandedTree.push(childElem);
                addChildren(childElem);
            });
        }
    }

    let expandedTree = [];
    elements.forEach(function (elem) {
        addChildren(elem);
    });
    return expandedTree;
}

var $ = function (selector) {
    return new OfeckQuery(selector);
};

function OfeckQuery(query) {

    var arrElements = Array.from(document.all);
    let selectors = query.split(" ");
    selectors.forEach(function (selector) {
       arrElements =  excuteSelectorOnElemnts(selector, arrElements, selectors);
    });

    this.elements = arrElements;
}

function excuteSelectorOnElemnts(selector, arrElements, selectors) {
    arrElements = selectorFilters[findSelectorType(selector)](arrElements, selector);
    if (selectors.indexOf(selector) != selectors.length - 1) {
        arrElements = Array.from(new Set(expandTree(arrElements)));
    }

    return arrElements;
}

OfeckQuery.prototype = {
    addClass: function (clazz) {
        this.elements.forEach(function (elem) {
            elem.classList.add(clazz);
        })
    },

    removeClass: function (clazz) {
        this.elements.forEach(function (elem) {
            elem.classList.remove(clazz);
        })
    },

    css: function (property, value) {
        this.elements.forEach(function (elem) {
            elem.style[property] = value;
        })
    },

    count: function () {
        return this.elements.length;
    },

    get: function (index) {
        return this.elements[index];
    }
    ,

    setAttribute: function (attributeName, attributeValue) {
        this.elements.forEach(function (elem) {
            elem.setAttribute(attributeName, attributeValue);
        })
    }
    ,

    getAttribute: function (attributeName) {
        var attributes = [];
        this.elements.forEach(function (elem) {
            attributes.push(elem.getAttribute(attributeName));
        })
        return attributes
    }
    ,

    appendChild: function (childElement) {
        var docFrag = document.createDocumentFragment();
        docFrag.appendChild(childElement);

        this.elements.forEach(function (elem) {
            elem.appendChild(docFrag.cloneNode(deep));
        });
    }
    ,

    each: function (fn) {
        this.elements.forEach(function (elem) {
            fn(elem);
        });
    }
    ,

    map: function (fn) {
        var tempElements = [];
        this.elements.forEach(function (elem) {
            var tempNode = elem.cloneNode(deep);
            fn(tempNode);
            tempElements.push(tempNode)
        });
        return tempElements;
    }
    ,

    any: function (...fn) {
        for (var indexE = 0; indexE < this.elements.length; indexE++) {
            var elemSuccess = true;
            for (var index = 0; index < fn.length; index++) {
                if (!(fn[index](this.elements[indexE]))) {
                    elemSuccess = false;
                    break;
                }
            }

            if (elemSuccess) {
                return true;
            }
        }
        return false;
    }
    ,

    all: function (...fn) {
        for (var indexE = 0; indexE < this.elements.length; indexE++) {
            for (var index = 0; index < fn.length; index++) {
                if (!(fn[index](this.elements[indexE]))) {
                    return false;
                }
            }
        }
        return true;
    }
    ,

    filter: function (...fn) {
        var newElements = [];

        this.elements.forEach(function (elem) {
            let suitible = true;
            fn.forEach(function (func) {
                if (!func(elem)) {
                    suitible = false;
                }
            });
            if (suitible) {
                newElements.push(elem);
            }
        });

        var query = new $(" ");
        query.elements = newElements;
        return query;
    }
};
