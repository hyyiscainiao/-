const NewsService = require("../../services/web/NewsService");

const NewsController = {
  getlist: async (req, res) => {
    const result = await NewsService.getlist({ id: req.params.id });
    // console.log(results)
    if (result.length !== 0) {
      res.cc(1, "获取成功", result);
    } else {
      res.cc(-1, "获取失败");
    }
  },
  toplist:async(req,res)=>{
    console.log(req.params.limit)
    const result = await NewsService.toplist({ limit:req.query.limit });
    // console.log(results)
    if (result.length !== 0) {
      res.cc(1, "获取成功", result);
    } else {
      res.cc(-1, "获取失败");
    }
  }
};

module.exports = NewsController;
