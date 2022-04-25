const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SitesController');
const  middleWare = require('../app/middlewares/AuthMiddle');

router.get('/', siteController.index);
router.use('/',middleWare.auth);
router.get('/products', siteController.products);

router.get('/:company', siteController.productsAccordingToCompany);



module.exports = router;