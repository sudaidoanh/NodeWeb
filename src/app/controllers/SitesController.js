const Companies = require('../models/Companies');
const Products = require('../models/Products');
const Carts = require('../models/Carts');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');
const { mongooseToObject } = require('../../ulti/mongoose');
const Users = require('../models/Users');

class SitesController{


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

    search(req, res, next) {
        let productsQuery = Products.find({ name: `/${req.body.key}/i` }, 'name company');
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

   

    async cart(req, res, next) {
        

        Promise.all([Companies.find({}), Carts.findOne({userID: req.session.userID._id})])
            .then(([companies, carts ]) => {
                res.render('site/cart', {
                    companies: (companies),
                    products: (carts.products),
                })
            })
    }

    async addProductToCart(req, res, next) {
        let userCart = await Carts.findOne({ userID: req.session.userID._id });

        let product = await Products.findOne({_id:req.params.id})


        if (!userCart) {
            userCart =  new Carts({userID: req.session.userID._id , 
                deliveryAddress: null,
                products:{
                    [product.name] :1,
                }
            });
            await userCart.save();
            
            
        }else{
            const products = userCart.products;
            var value = products.get(product.name);
            if(value){
                products.set(product.name,++value);
            }else{
                products.set(product.name,1);
            }
            await userCart.save();
        }
        res.redirect('/cart')
    }
    
    productDetail(req, res, next) {
        Promise.all([Companies.find({}), Products.findOne({slug: req.params.slug})])
        .then(([companies, data]) => 
            res.render('site/productDetail', {
                companies: mutipleMongooseToObject(companies),
                product: mongooseToObject(data),

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