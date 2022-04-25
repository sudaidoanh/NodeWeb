
const siteRouter = require('./site');
const peopleRouter = require('./people');
const adminRouter = require('./admin');

function route(app) {
    app.use('/go-to-admin-page', adminRouter);
    app.use('/', siteRouter);
}

module.exports = route;