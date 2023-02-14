const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminsController');

router.get('/trash', adminController.trash);

router.put('/manageProducts/:slug', adminController.update);
router.get('/manageProducts/:slug', adminController.edit);

router.patch('/trash/:slug/restore', adminController.restore);


router.get('/addNewAdmin', adminController.addNewAdmin);
router.get('/addNewCompany', adminController.addNewCompany);
router.get('/addProduct', adminController.addProduct);

router.delete('/manageProducts/:slug', adminController.delete);
router.delete('/trash/:slug/permanentlyDelete', adminController.permanentlyDelete);

router.post('/handle-form-action', adminController.handleFormAction);
router.post('/saveNewAdmin', adminController.saveNewAdmin);
router.post('/saveNewCompany', adminController.saveNewCompany);
router.post('/storageProduct', adminController.storageProduct);

router.get('/manageProducts', adminController.manageProducts);

router.get('/', adminController.admin);

module.exports = router;