const express = require('express');
const router = express.Router();

const peopleController = require('../app/controllers/PeopleController');


router.get('/create', peopleController.create);
router.get('/trash', peopleController.trash);
router.post('/storage', peopleController.storage);
router.post('/handle-form-action', peopleController.handleFormAction);
router.put('/:slug/edit', peopleController.update);
router.delete('/:slug', peopleController.delete);
router.delete('/:slug/permanentlyDelete', peopleController.permanentlyDelete);
router.patch('/:slug/restore', peopleController.restore);
router.get('/:slug/edit', peopleController.edit);
router.get('/:slug', peopleController.show);
router.get('/', peopleController.index);

module.exports = router;