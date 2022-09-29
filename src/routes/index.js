var express = require('express');
var router = express.Router();
var indexController = require('./../controller/indexController');
var upload = require('../middleWare/multer');

router.get('/', indexController.home);

router.get('/list/removed', indexController.listRemoved);

router.get('/list/edit-remove', indexController.listEditRemove);

router.get('/create', indexController.create);

router.post('/create', indexController.build);

router.put('/slide/activate/:id', indexController.activate)

router.get('/slide/edit/:id', indexController.edit);

router.put('/slide/edit/:id', indexController.change);

router.delete('/slide/remove/:id', indexController.remove);

module.exports = router;
