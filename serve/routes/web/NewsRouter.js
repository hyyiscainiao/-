var express = require('express');


var NewsRouter = express.Router();
const NewsController=require('../../controllers/web/NewsController.js') 

NewsRouter.get('/list',NewsController.getlist)
NewsRouter.get('/list/:id',NewsController.getlist)
NewsRouter.get('/toplist',NewsController.toplist)

// NewsRouter.post('/update',NewsController.update)
module.exports = NewsRouter;
