const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SitesController');
const  middleWare = require('../app/middlewares/AuthMiddle');

router.get('/', siteController.index);

router.use('/',middleWare.auth);

router.get('/products/:key', siteController.search);

router.get('/products', siteController.products);
router.get('/productDetail/:slug', siteController.productDetail);
router.get('/cart', siteController.cart)
router.get('/cart/:id', siteController.addProductToCart)
// router.delete('/cart/:id', siteController.deleteProductToCart)

//router.patch('/cart/:id', siteController.addProductToCart)
router.get('/:company', siteController.productsAccordingToCompany);



module.exports = router;