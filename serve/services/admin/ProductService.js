const { queryOne } = require("../../db/index");
const ProductService = {
  //   upload: async ({ id, Productname, gender, introduction, avatar }) => {
  //     // console.log(id,Productname,gender,introduction,avatar)
  //     let sql = "";
  //     if (avatar) {
  //       sql = `update Products set  Productname='${Productname}' ,gender='${gender}',introduction='${introduction}' , avatar='${avatar}' where id='${id}'`;
  //     } else {
  //       sql = `update Products set  Productname='${Productname}' ,gender='${gender}',introduction='${introduction}' where id='${id}'`;
  //     }
  //     const result = await queryOne(sql);
  //     // console.log(result)
  //     if (result.affectedRows === 1) {
  //       const sql1 = `select * from Products where id='${id}'`;
  //       const result1 = await queryOne(sql1);
  //       return result1[0];
  //     }
  //   },
  add: async ({ name, introduction, detail, cover, editTime }) => {
    // console.log(id,Productname,gender,introduction,avatar)
    const sql = `insert into products  (name,  introduction, detail, cover,editTime) values ('${name}','${introduction}','${detail}','${cover}','${editTime}')`;

    const result = await queryOne(sql);
    return result;
  },
  getlist: async ({ id }) => {
    const sql = id
      ? `select * from products where id='${id}'`
      : `select * from products ORDER BY ID ASC`;
    const result = await queryOne(sql);
    return result;
  },
  delList: async (id) => {
    const sql = `DELETE FROM products WHERE id = '${id}'`;
    const result = await queryOne(sql);
    return result;
  },
  updatelist: async ({ id, name, introduction, detail, cover, editTime }) => {
    const sql = cover
      ? `update Products set name='${name}' ,introduction='${introduction}' ,cover='${cover}',detail='${detail}',editTime='${editTime}' WHERE id = '${id}'`
      : `update Products set name='${name}' ,introduction='${introduction}' ,detail='${detail}',editTime='${editTime}' WHERE id = '${id}'`;
    const result = await queryOne(sql);
    return result;
  },
};
module.exports = ProductService;
