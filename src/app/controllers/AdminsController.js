const Admin = require('../models/Admins');
const Companies = require('../models/Companies');
const Products = require('../models/Products');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class AdminsController{

    addNewAdmin(req, res, next) {
        Promise.all([Companies.find({}), ])
            .then(([ companies ]) => 
                res.render('admin/addNewAdmin', {
                    companies: mutipleMongooseToObject(companies)
                }))
            .catch(next);    
     }   

    addNewCompany(req, res, next) {
        Promise.all([Companies.find({}), ])
        .then(([ companies ]) => 
            res.render('admin/addNewCompany', {
                companies: mutipleMongooseToObject(companies)
            }))
        .catch(next);    
 }   
    addProduct(req, res, next) {
        const products = Products.find({});
        var catelogyPrototype = Products.schema.path('catelogy').options.enum;
        Promise.all([catelogyPrototype, Companies.find({}), ])
            .then(([catelogy, companies ]) => 
                res.render('admin/addProduct', {
                    catelogy,
                    companies: mutipleMongooseToObject(companies)
                }))
            .catch(next);
    }

    saveNewAdmin(req, res, next) {
        var formData = req.body;
        const admin = new Admin(formData);
        admin.save()
            .then(() => res.redirect('/go-to-admin-page'))
            .catch(next);
    }

    saveNewCompany(req, res, next) {
        var formData = req.body;
        const company = new Companies(formData);
        company.save()
            .then(() => res.redirect('/go-to-admin-page/addnewCompany'))
            .catch(next);
    }

    storageProduct(req, res, next) {
        var formData = req.body;
        const products = new Products(formData);
        products.save()
            .then(() => res.redirect('/go-to-admin-page/addProduct'))
            .catch(next);
    }

    manageProducts(req, res) {
        Promise.all([Companies.find({}), ])
        .then(([ companies ]) => 
            res.render('admin/manageProducts', {
                companies: mutipleMongooseToObject(companies)
            }))
        .catch(next);   
    }

    admin(req, res, next) {

        Promise.all([Companies.find({}), ])
        .then(([ companies ]) => 
            res.render('admin/mainPageAdmin', {
                companies: mutipleMongooseToObject(companies)
            }))
        .catch(next);    
    }
    
}

module.exports = new AdminsController;