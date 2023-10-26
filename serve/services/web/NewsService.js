const { queryOne } = require("../../db/index");
const NewsService = {
  getlist: async ({ id }) => {
    const sql = id
      ? `select * from news where id='${id}' and isPublish=1`
      : `select * from news where isPublish=1 ORDER BY editTime DESC`;
    const result = await queryOne(sql);
    return result;
  },
  toplist:async({limit})=>{
    const sql=`select * from news  ORDER BY editTime ASC limit 0,${limit}`;
    const result = await queryOne(sql);
    return result;
  }
};
module.exports = NewsService;
