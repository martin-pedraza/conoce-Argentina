var express = require('express');
var router = express.Router();
var upload = require('../middleWare/multer');
var indexController = require('./../controller/indexController');

router.get('/', indexController.home);

router.get('/list/removed', indexController.listRemoved);

router.get('/list/edit-remove', indexController.listEditRemove);

router.get('/create', indexController.create);

router.post('/create', upload.single('img'), indexController.build);

router.put('/slide/activate/:id', indexController.activate);

router.get('/slide/edit/:id', indexController.edit);

router.put('/slide/edit/:id', upload.single('img'), indexController.change);

router.delete('/slide/remove/:id', indexController.remove);

router.delete('/slide/delete/:id', indexController.delete);

module.exports = router;
