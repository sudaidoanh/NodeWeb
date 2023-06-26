
const siteRouter = require('./site');
const adminRouter = require('./admin');
const middleWare = require('./middleWare');

function route(app) {
    app.use((req, res, next) => {
        res.locals.session = req.session;
        next();
    })
    app.use('/auth',middleWare);

    app.use('/go-to-admin-page', adminRouter);
    app.use('/', siteRouter);


}

module.exports = route;