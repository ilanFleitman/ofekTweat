var testDiv;
var ul;


function assert(value, name) {
    var docfrag = document.createDocumentFragment();
    var li = document.createElement("li");
    if (value) {
        li.style.backgroundColor = "green";
        li.innerHTML = name;
        li.style.border = "0.1vw solid #122b40";
        li.style.padding = "5px";
        li.style.margin = "5px";
    } else {
        divTestGroup.style.backgroundColor = "red";
        li.style.backgroundColor = "red";
        li.innerHTML = name;
        li.style.border = "0.1vw solid #122b40";
        li.style.padding = "5px";
        li.style.margin = "5px";
    }

    docfrag.appendChild(li);
    ul.appendChild(docfrag);
}

function resetsTests() {
    var docfrag = document.createDocumentFragment();

    testDiv = document.createElement("div");
    testDiv.id = "testing";
    testDiv.style.backgroundColor = "#4cae4c";
    docfrag.appendChild(testDiv);
    document.getElementById("footer").appendChild(docfrag);
}

function test_group(name, test_group_function) {
    var docfrag = document.createDocumentFragment();
    divTestGroup = createDiv();
    var nameLabel = document.createElement("label");
    nameLabel.innerHTML = name;
    ul = document.createElement("ul");
    ul.className = "list-unstyled text-center";
    ul.style.padding = "2vw";
    test_group_function();
    divTestGroup.appendChild(nameLabel);
    divTestGroup.appendChild(ul);
    docfrag.appendChild(divTestGroup);
    testDiv.appendChild(docfrag);
}

function countUserNames(number) {
    return document.getElementById("tweets").querySelectorAll(".tweet").length === number;
}

function countLogo(number) {
    return document.querySelectorAll("#ofek-logo").length === number;
}

function testNonExistingId() {
    var doc = $("div").filter(function (elem) {
        return elem.classList.contains("ilan");
    });

    return doc.elements.length === 0;
}

function cssGreen() {
    $('a').css("color","coral");
    var styles = $('a').getAttribute("style");
    for (var style of styles) {
        if (style.split(":")[1] != " coral;") {
            return false;
        }
    };
    return true;
}

function cssAddClass() {
    var tweets =  $("#tweets label");
    tweets.addClass("ilan");
    for (var index=0; index < tweets.length; index++) {
        if(!(tweets[index].classList.contains("ilan"))) {
            return false;
        }
    }
    return true;
}

function cssRemoveClass() {
    var tweets =  $("#tweets label");
    tweets.removeClass("ilan");
    for (var index=0; index < tweets.length; index++) {
        if(tweets[index].classList.contains("ilan")) {
            return false;
        }
    }
    return true;
}
function all1() {
    var btn = $(".navbar button").all(function (elem) {
        return elem.children.length == 1;
    });
    return btn;
}

function all2() {
    var btn = $(".navbar button").any(function (elem) {
        return elem.children.length != 0;
    });
    return btn;
}

function all3() {
    return $("div label").all(function(elem) { return elem.innerHTML.includes("s")}, function (elem) {
        return elem.innerHTML.includes("e")
    });
}

