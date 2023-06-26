const Companies = require('../models/Companies');
const Products = require('../models/Products');
const Users = require('../models/Users');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');
const { mongooseToObject  } = require('../../ulti/mongoose');

class AdminsController{

    addNewCompany(req, res, next) {
        Promise.all([Companies.find({}), ])
        .then(([ companies ]) => 
            res.render('admin/addNewCompany', {
                companies: mutipleMongooseToObject(companies),
                layout: "adminLayouts"
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
                    companies: mutipleMongooseToObject(companies),
                    layout: "adminLayouts"
                }))
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

    edit(req, res, next) {
        // Products.findById(req.params.id)
        Promise.all([Companies.find({}), Products.findOne( {slug: req.params.slug })])
            .then(([companies, product]) => 
            res.render('admin/editProduct', {
                companies: mutipleMongooseToObject(companies),
                product: mongooseToObject(product),
                layout: 'adminLayouts'
            }))
            .catch(next);
    }

    update(req, res, next) {
        Products.updateOne({ slug: req.params.slug}, req.body)
            .then(() => res.redirect(`/go-to-admin-page/manageProducts/${req.params.slug}`))
            .catch(next);
    }

    delete(req, res, next) {
        Products.delete({ slug: req.params.slug})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    permanentlyDelete(req, res, next) {
        Products.deleteOne({ slug: req.params.slug})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    trash(req, res, next) {

        Promise.all([Products.findDeleted({}), Products.countDocuments(), Products.countDocumentsDeleted(), Users.countDocuments()])
        .then(([ products, countDocuments, countDocumentsDeleted, countUsers]) => 
            res.render('admin/productTrash', {
                products: mutipleMongooseToObject(products),
                countDocuments, 
                countDocumentsDeleted, 
                countUsers,
                layout: 'adminLayouts',
            }))
        .catch(next);   
    
    }

    restore(req, res, next) {
        Products.restore({ slug: req.params.slug})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Products.delete({ slug:{ $in:  req.body.productSlugs }})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;  
            case 'restore':
                Products.restore({ slug:{ $in:  req.body.productSlugs }})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break; 
            default:
                res.render({ message: 'Action invalid'});
        }
    }

    manageProducts(req, res, next) {
        let productsQuery = Products.find({});

        if(req.query.hasOwnProperty('_sort')) {
            productsQuery = productsQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([ productsQuery, Products.countDocuments(), Products.countDocumentsDeleted(), Users.countDocuments()])
            .then(([ products, countDocuments, countDocumentsDeleted, countUsers]) => 
                res.render('admin/manageProducts', {
                    products: mutipleMongooseToObject(products),
                    countDocuments, 
                    countDocumentsDeleted, 
                    countUsers,
                    layout: 'adminLayouts',
                }))
            .catch(next);   
    }

    users(req, res, next) {
        let usersQuery = Users.find({});

        if(req.query.hasOwnProperty('_sort')) {
            usersQuery = usersQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([ usersQuery, Users.countDocuments(), Products.countDocumentsDeleted(), Users.countDocuments()])
            .then(([ users, countDocuments, countDocumentsDeleted, countUsers]) => 
                res.render('admin/users', {
                    users: mutipleMongooseToObject(users),
                    countDocuments, 
                    countDocumentsDeleted, 
                    countUsers,
                    layout: 'adminLayouts',
                }))
            .catch(next);   
    }

    admin(req, res, next) {

        Promise.all([Products.countDocuments(), Products.countDocumentsDeleted(), Users.countDocuments()])
        .then(([ countDocuments, countDocumentsDeleted, countUsers]) => 
            res.render('admin/mainPageAdmin', {
                countDocuments, 
                countDocumentsDeleted, 
                countUsers,
                layout: 'adminLayouts',
            }))
        .catch(next);    
    }
    
}

module.exports = new AdminsController;