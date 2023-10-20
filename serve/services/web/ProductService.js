const { queryOne } = require("../../db/index");
const ProductService = {
  getlist: async ({ id }) => {
    const sql = id
      ? `select * from products where id='${id}'`
      : `select * from products  ORDER BY editTime ASC`;
    const result = await queryOne(sql);
    return result;
  },
  toplist:async({limit})=>{
    const sql=`select * from Products  ORDER BY editTime ASC limit 0,${limit}`;
    const result = await queryOne(sql);
    return result;
  }
};
module.exports = ProductService;
