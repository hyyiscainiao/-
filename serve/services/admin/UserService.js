const { queryOne } = require("../../db/index");
const UserService = {
  login: async ({ username }) => {
    // console.log(username)
    const sql = `select * from users where username='${username}' `;
    const result = await queryOne(sql);
    return result[0];
  },
  upload: async ({ id, username, gender, introduction, avatar }) => {
    // console.log(id,username,gender,introduction,avatar)
    let sql = "";
    if (avatar) {
      sql = `update users set  username='${username}' ,gender='${gender}',introduction='${introduction}' , avatar='${avatar}' where id='${id}'`;
    } else {
      sql = `update users set  username='${username}' ,gender='${gender}',introduction='${introduction}' where id='${id}'`;
    }
    const result = await queryOne(sql);
    // console.log(result)
    if (result.affectedRows === 1) {
      const sql1 = `select * from users where id='${id}'`;
      const result1 = await queryOne(sql1);
      return result1[0];
    }
  },
  add: async ({ username, gender, introduction, avatar, role, password }) => {
    // console.log(id,username,gender,introduction,avatar)
    const sql = `insert into users  (username,password,gender,introduction,avatar,role) values ('${username}','${password}','${gender}','${introduction}','${avatar}','${role}')`;

    const result = await queryOne(sql);
    return result;

    // console.log(r)
  },
  getlist: async () => {
    // console.log(currentPage,pageSize)
    // const num = (currentPage - 1) *pageSize
    const sql = `select * from users ORDER BY ID ASC`;
    const result = await queryOne(sql);
    return result;
  },
  delList: async (id) => {
    const sql = `DELETE FROM users WHERE id = '${id}'`;
    const result = await queryOne(sql);
    return result;
  },
  update: async ({ id, username, role, introduction, password }) => {
    const sql = `update users set username='${username}' ,role='${role}',introduction='${introduction}' ,password='${password}' WHERE id = '${id}'`;
    const result = await queryOne(sql);
    return result;
  },
};
module.exports = UserService;
