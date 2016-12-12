describe('Query selector', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
    });

    describe("check to selectors", function () {
        it('Should get all of the elements of the same tag', function () {
            var liAmount = $('li').count();

            expect(liAmount).toBe(10);
        });

        it('should be able find nested elements', function () {
            var eleAmount = $('div li p').count();

            expect(eleAmount).toBe(1);
        });
    });
    describe("check get and set attribute functions", function () {
        it("should be able to set attribute", function () {
            $('ol li').setAttribute('class', 'shalom');
            var list = $('ol li').getAttribute('class');
            var able = true;
            for (var clazz of list) {
                if (clazz != 'shalom') {
                    able = false;
                    break;
                }
            }
            expect(able).toBeTruthy();
        });

        it('should be abele to get attribute', function () {
            var olVars = $('ol').getAttribute("id");
            var able = true;
            for (var ol of olVars) {
                if (ol != "ilan-likes") {
                    able = false;
                    break;
                }
            }

            expect(able).toBeTruthy();
        });

    });
    describe("check add and remove class functions", function () {
        it('should be able to add class', function () {
            var likes = $("#ilan-likes li");
            likes.addClass("ilan");
            var able = true;
            for (var index = 0; index < likes.length; index++) {
                if (!(likes[index].classList.contains("ilan"))) {
                    able = false;
                    break;
                }
            }
            expect(able).toBeTruthy();
        });

        it('should be able to remove class', function () {
            var likes = $("#ilan-likes li");
            likes.removeClass("david");
            var able = true;
            for (var index = 0; index < likes.length; index++) {
                if (!(likes[index].classList.contains("ilan"))) {
                    able = false;
                    break;
                }
            }
            expect(able).toBeTruthy();
        });

    });

    describe("check css function", function () {
        it("shuld be able to add css", function () {
            $('#ilan-dislikes li').css("color", "white");
            var styles = $('#ilan-dislikes li').getAttribute("style");
            var able = true;
            for (var style of styles) {
                if (style.split(":")[1] != " white;") {
                    able = false;
                }
            }

            expect(able).toBeTruthy();
        });
    });

    describe("check get function", function () {
        it("should be able get element place 4", function () {
            var fourthLike = $('#ilan-likes li').get(4);
            expect(fourthLike.innerHTML).toBe("Sleeping");
        });
    });

    describe("check appand child function", function () {
        it("should be able to add li to ol", function () {
            var list = $('ol').appendChild(document.createElement('li'));
            var listLength = $('ol li').count();
            expect(listLength).toBe(7);
        });

    });

    describe("check all function", function () {
        it("check all with one function", function () {
            var result = $("ol li").all(function (elem) {
                return elem.innerHTML != "";
            });
            expect(result).toBeTruthy();
        });

        it("check all with more then one function", function () {
            var result = $("ol li").all(function (elem) {
                return elem.innerHTML != "";
            }, function (elem) {
                return elem.className == "david";
            });
            expect(result).toBeTruthy();
        });
    });

    describe("check any function", function () {
        it("check any with one function that check clls is ilan", function () {
            var result = $("ul li").any(function (elem) {
                return elem.className = "ilan";
            });
            expect(result).toBeTruthy();
        });

        it("check any with more then one function that checks that there is no text and class is ilan", function () {
            var result = $("ul li").any(function (elem) {
                return elem.innerHTML == "";
            }, function (elem) {
                return elem.className == "ilan";
            });
            expect(result).toBeTruthy();
        });
    });

    describe("check filter function", function () {
        it("check filter with one function", function () {
            var filteredLikesLength = $("ol li").filter(function (elem) {
                return elem.innerHTML.includes('s');
            }).count();

            expect(filteredLikesLength).toBe(3);
        })

        it("check filter with more then one function", function () {
            var filteredLikesLength = $("ol li").filter(function (elem) {
                return elem.innerHTML.includes('l');
            }, function (elem) {
                return elem.innerHTML.includes('S');
            }).count();

            expect(filteredLikesLength).toBe(1);
        })
    })

    describe("check map function", function () {
        it("check map function with one function that add world", function () {
            var mappedLikes = $('ol li').map(function (elem) {
                elem.innerHTML += " world";
            });
            var able = true;
            for (var mappedLike of mappedLikes) {
                if (!mappedLike.innerHTML.includes("world")) {
                    able = false;
                    break;
                }
            }
            expect(able).toBeTruthy();
        });
    })

});
