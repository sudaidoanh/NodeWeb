const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminsController');

router.get('/addNewAdmin', adminController.addNewAdmin);
router.get('/addNewCompany', adminController.addNewCompany);
router.get('/addProduct', adminController.addProduct);

router.post('/saveNewAdmin', adminController.saveNewAdmin);
router.post('/saveNewCompany', adminController.saveNewCompany);
router.post('/storageProduct', adminController.storageProduct);

router.get('/manageProducts', adminController.manageProducts);
router.get('/', adminController.admin);

module.exports = router;