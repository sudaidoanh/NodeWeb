const Admin = require('../models/Admins');
const Companies = require('../models/Companies');
const Products = require('../models/Products');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');
const { mongooseToObject  } = require('../../ulti/mongoose');

class AdminsController{

    addNewAdmin(req, res, next) {
        Promise.all([Companies.find({}), ])
            .then(([ companies ]) => 
                res.render('admin/addNewAdmin', {
                    companies: mutipleMongooseToObject(companies),
                    layout: "adminLayouts"
                }))
            .catch(next);    
     }   

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

        Products.findDeleted({})
            .then(products => {
                res.render('admin/productTrash', {
                    products: mutipleMongooseToObject(products),
                    layout: 'adminLayouts'
                });
            })
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
        Promise.all([Companies.find({}), productsQuery])
            .then(([ companies, products]) => 
                res.render('admin/manageProducts', {
                    companies: mutipleMongooseToObject(companies),
                    products: mutipleMongooseToObject(products),
                    layout: 'adminLayouts',
                }))
            .catch(next);   
    }

    admin(req, res, next) {

        Promise.all([Companies.find({}), ])
        .then(([ companies ]) => 
            res.render('admin/mainPageAdmin', {
                companies: mutipleMongooseToObject(companies),
                layout: 'adminLayouts'
            }))
        .catch(next);    
    }
    
}

module.exports = new AdminsController;