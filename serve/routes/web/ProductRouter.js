var express = require('express');


var ProductRouter = express.Router();
const ProductController=require('../../controllers/web/ProductController.js') 

ProductRouter.get('/list',ProductController.getlist)
ProductRouter.get('/list/:id',ProductController.getlist)
ProductRouter.get('/toplist',ProductController.toplist)

module.exports =ProductRouter;
