/**
 * Created by Jbt on 12/12/2016.
 */
describe("test tweetBL", function () {
    var tweetBl;
    beforeAll(function (done) {
        tweetBl = require("../../tweetBL");
        tweetBl.getAllTweets().then(done);
    });


    describe("test get all tweet of the specific user", function () {
        it("check number of tweets of user id 10", function (done) {
            var tweets = tweetBl.getAllUserTweets("10");
            expect(tweets.length).toBe(8);
            done();
        });

        it("check if there is no user id return 0", function (done) {
            var tweets = tweetBl.getAllUserTweets("this is fake id");
            expect(tweets.length).toBe(0);
            done();
        })
    })

    describe("test get all tweets", function () {
        it("get all tweets", function (done) {
            tweetBl.getAllTweets().then(function (response) {
                expect(response.length).toBe(66);
                done();
            })
        })
    })
});