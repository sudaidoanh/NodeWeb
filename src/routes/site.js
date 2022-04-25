const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SitesController');


router.get('/register', siteController.register);
router.post('/login', siteController.login);
router.get('/login', siteController.login);
router.get('/products', siteController.products);

router.get('/:company', siteController.productsAccordingToCompany);


router.get('/', siteController.index);

module.exports = router;