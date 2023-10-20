var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })
var ProductRouter = express.Router();
const ProductController=require('../../controllers/admin/ProductController.js') 
/* GET home page. */
ProductRouter.post('/list',upload.single('file'),ProductController.updatelist)
ProductRouter.post('/add',upload.single('file'),ProductController.add)
ProductRouter.get('/list',ProductController.getlist)
ProductRouter.get('/list/:id',ProductController.getlist)
ProductRouter.delete('/list/:id',ProductController.delList)

// ProductRouter.post('/update',ProductController.update)
module.exports = ProductRouter;
