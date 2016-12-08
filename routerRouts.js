function rout(app) {
    require('./pagesRouts')(app);
    require('./usersRouts')(app);
    require('./tweetsRouts')(app);
    require('./logInRouts')(app);
}

module.exports = rout;


















