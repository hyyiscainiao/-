var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
var UserRouter = express.Router();
const UserController=require('../../controllers/admin/UserController.js') 
/* GET home page. */
UserRouter.post("/login",UserController.login)
UserRouter.get('/home',(req,res)=>{
    res.send('ok')
})
UserRouter.post('/upload',upload.single('file'),UserController.upload)
UserRouter.post('/add',upload.single('file'),UserController.add)
UserRouter.get('/list',UserController.getlist)
UserRouter.delete('/list/:id',UserController.delList)
UserRouter.post('/update',UserController.update)
module.exports = UserRouter;
