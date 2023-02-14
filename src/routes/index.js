
const siteRouter = require('./site');
const adminRouter = require('./admin');
const middleware = require('./middleWare');

function route(app) {
    app.use('/auth',middleware);
    app.use('/go-to-admin-page', adminRouter);
    app.use('/', siteRouter);
}

module.exports = route;