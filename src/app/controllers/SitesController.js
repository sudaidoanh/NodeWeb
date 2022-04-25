const Companies = require('../models/Companies');
const Products = require('../models/Products');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class SitesController{

    register(req, res, next) {

    }

    login(req, res, next) {

    }

    products(req, res, next) {
        let productsQuery = Products.find({});
        if(req.query.hasOwnProperty('_sort')) {
            productsQuery = productsQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([Companies.find({}), productsQuery, Products.find({}).countDocuments() ])
            .then(([companies, products, countProduct]) => 
                res.render('site/products', {
                    companies: mutipleMongooseToObject(companies),
                    products: mutipleMongooseToObject(products),
                    countProduct,
                }))
            .catch(next);
    }

    productsAccordingToCompany(req, res, next) {
        let productsQuery = Products.find({ company: req.params.company });
        if(req.query.hasOwnProperty('_sort')) {
            productsQuery = productsQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([Companies.find({}), productsQuery, Products.find({ company: req.params.company }).countDocuments(), req.params.company])
            .then(([companies, products, countProduct, company]) => 
                res.render('site/products', {
                    companies: mutipleMongooseToObject(companies),
                    products: mutipleMongooseToObject(products),
                    company,
                    countProduct,
                }))
            .catch(next);
    }

    index(req, res, next) {
        const Top5Discount =  Products.find({}).sort({
            discount: 'desc',
        }).limit(5);
        Promise.all([Companies.find({}), Products.find({}), Top5Discount ])
            .then(([companies, products, top5Discount]) => 
                res.render('home', {
                    companies: mutipleMongooseToObject(companies),
                    products: mutipleMongooseToObject(products),
                    top5Discount: mutipleMongooseToObject(top5Discount),
                }))
            .catch(next);
    }
    
}

module.exports = new SitesController;