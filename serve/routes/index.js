var usersRouter=require('./admin/UserRouter')
var newsRouter=require('./admin/NewsRouter')
var productRouter=require('./admin/ProductRouter')
var NewsRouter=require('./web/NewsRouter')
var ProductRouter=require('./web/ProductRouter')

module.exports = (app)=>{
  app.use("/adminapi/users", usersRouter);
  app.use('/adminapi/news',newsRouter);
  app.use('/adminapi/products',productRouter);
  app.use('/webapi/news',NewsRouter);
  app.use('/webapi/product',ProductRouter);
};
