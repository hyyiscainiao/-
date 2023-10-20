const { queryOne } = require("../../db/index");
const NewsService = {
  add: async ({ title, content, category, cover, isPublish, editTime }) => {
    const sql = `insert into news  (title, content, category, cover,isPublish,editTime) values ('${title}','${content}','${category}','${cover}','${isPublish}','${editTime}')`;
    const result = await queryOne(sql);
    return result;
  },
  getlist: async ({ id }) => {
    const sql = id
      ? `select * from news where id='${id}'`
      : `select * from news ORDER BY ID ASC`;
    const result = await queryOne(sql);
    return result;
  },
  delList: async (id) => {
    const sql = `DELETE FROM news WHERE id = '${id}'`;
    const result = await queryOne(sql);
    return result;
  },
  publish: async ({ id, isPublish, editTime }) => {
    const sql = `update news set isPublish='${isPublish}',editTime='${editTime}' where id='${id}'`;
    const result = await queryOne(sql);
    return result;
  },

  updatelist: async ({
    id,
    title,
    content,
    category,
    cover,
    isPublish,
    editTime,
  }) => {
    const sql = cover
      ? `update  news set title='${title}', content='${content}', category='${category}', cover='${cover}',isPublish='${isPublish}',editTime='${editTime}' where id='${id}'`
      : `update  news set title='${title}', content='${content}', category='${category}',isPublish='${isPublish}',editTime='${editTime}' where id='${id}'`;
    const result = await queryOne(sql);
    return result;
  }
};
module.exports = NewsService;
