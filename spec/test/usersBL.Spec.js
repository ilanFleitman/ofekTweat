describe("test usersBL", function () {
    var userBL = require("../../userBl");
    beforeAll(function (done) {
        userBL.getAllUsers().then(done);
    });

    describe("test function get user by its id", function () {
        it("test function if user id is 10 should return user ilan", function () {
            var ilanUser = {
                _id: '10',
                username: 'ilan',
                password: '1234',
                following: ['11',
                    'c28dd406-3595-42f6-8e36-15d4cd495293',
                    '5e07631e-3974-47f8-a89c-bb41ce1e0e3d']
            };

            var user = userBL.userById("10");
            expect(user._id).toBe(ilanUser._id);
            expect(user.username).toBe(ilanUser.username);
        })

        it("test function if user id is fake should return undefined", function () {
            var user = userBL.userById("fake id");
            expect(user).toBeUndefined();
        })
    })

    describe("test get users who follow me", function () {
        it("check ilan user follwing list should be 1 user", function () {
            var users  = userBL.usersFolowingId("10");
            expect(users[0].following.includes("10")).toBeTruthy();
            expect(users.length).toBe(1);
        })

        it("check fake user follwing list should be 0 user ", function () {
            var users  = userBL.usersFolowingId("fake id");
            expect(users.length).toBe(0);
        })
    })

    describe("test function the gets the user with the right password and username", function () {
        it("check username ilan and password 1234 if exist should return ilan", function () {
            var user = userBL.findUserNameByUsernameAndPassword("ilan", "1234");
            expect(user._id).toBe("10");
            expect(user.username).toBe("ilan");
        })

        it("check username ilan and password 123 if exist should return null", function () {
            var user = userBL.findUserNameByUsernameAndPassword("ilan", "123");
            expect(user).toBeNull();
        })
    })

    describe("test function the check if the user with the right password and username is exist", function () {
        it("check username ilan and password 1234 if exist should return true", function () {
            var exist = userBL.findUserNameByUsernameAndPassword("ilan", "1234");
            expect(exist).toBeTruthy();
        })

        it("check username ilan and password 123 if exist should return false", function () {
            var exist = userBL.findUserNameByUsernameAndPassword("ilan", "123");
            expect(exist).toBeFalsy();
        })
    })



});