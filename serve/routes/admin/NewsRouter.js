var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'public/coveruploads/' })
const uploads = multer({ dest: 'public/newsuploads/' })

var NewsRouter = express.Router();
const NewsController=require('../../controllers/admin/NewsController.js') 
/* GET home page. */
NewsRouter.post('/add',upload.single('file'),NewsController.add)
NewsRouter.post('/upload',uploads.single('file'),NewsController.upload)
NewsRouter.get('/list',NewsController.getlist)

NewsRouter.get('/list/:id',NewsController.getlist)
NewsRouter.delete('/list/:id',NewsController.delList)
NewsRouter.put('/publish',NewsController.publish)
NewsRouter.post('/list',upload.single('file'),NewsController.updatelist)
// NewsRouter.post('/update',NewsController.update)
module.exports = NewsRouter;
