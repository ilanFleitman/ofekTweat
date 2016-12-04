function selectorFiltering(elements, selector) {
    if (selector.startsWith("#")) {
        elements = elements.filter(function (elem) {
            return elem.id === selector.substring(1) ;
        });

    } else if (selector.startsWith(".")) {
        elements  = elements.filter(function (elem) {
            return elem.className === selector.substring(1);
        });
    } else {
        elements = elements.filter(function (elem) {
            return elem.tagName === selector.toUpperCase();
        });
    }

    return elements;
}


function $(selector) {
    var elements = Array.from(document.all);
    var selectors = selector.split(" ");

    selectors.forEach(function (selctorToCheck) {
        elements = selectorFiltering(elements, selctorToCheck);
    })

    elements.addClass = function (clazz) {
        elements.forEach(function (elem) {
            elem.className += " " + clazz;
        })
    }

    elements.removeClass = function (clazz) {
        elements.forEach(function (elem) {
            if (elem.className.includes(clazz)) {
                elem.className.replace(clazz, " ");
            }
        })
    }

    return elements;
}
