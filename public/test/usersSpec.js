function add(x, y) {
    return x + y;
}


describe("users page", function () {
    describe("hi", function () {
        it("add", function () {
            var x = 1;
            var y = 1;

            var result = add(x, y);

            expect(result).toBe(2);
        });
    })
});
