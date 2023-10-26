const NewsService = require("../../services/admin/NewsService");

const NewsController = {
  add: async (req, res) => {
    const { title, content, category, isPublish } = req.body;
    console.log(title, isPublish);
    const result = await NewsService.add({
      title,
      content,
      category: Number(category),
      cover: `/coveruploads/${req.file.filename}`,
      isPublish: Number(isPublish),
      editTime: new Date(),
    });
    if (result.affectedRows === 1) {
      res.cc(1, "创建成功", result);
    } else {
      res.cc(-1, "创建失败");
    }
  },
  upload: async (req, res) => {
    console.log(req.body, req.file);
    if (req.file) {
      res.send({
        errno: 0, // 注意：值是数字，不能是字符串
        data: {
          url: "http://localhost:3000" + `/newsuploads/${req.file.filename}`, // 图片 src ，必须
        },
      });
    } else {
      res.send({
        errno: 1, // 只要不等于 0 就行
        message: "失败信息",
      });
    }
  },

  getlist: async (req, res) => {
    const result = await NewsService.getlist({id:req.params.id});
    // console.log(results)
    if (result.length !== 0) {
      res.cc(1, "获取成功", result);
    } else {
      res.cc(-1, "获取失败");
    }
  },
  delList: async (req, res) => {
    const result = await NewsService.delList(req.params.id);
    if (result.affectedRows === 1) {
      res.cc(1, "删除成功");
    } else {
      res.cc(-1, "删除失败");
    }
  },

  publish: async (req, res) => {
    const result = await NewsService.publish({
      ...req.body,
      editTime: new Date(),
    });
    if (result.affectedRows === 1) {
      res.cc(1, "删除成功");
    } else {
      res.cc(-1, "删除失败");
    }
  },
  updatelist:  async (req, res) => {
    
    let cover=req.file?`/coveruploads/${req.file.filename}`:''
    const {id, title, content, category, isPublish } = req.body;
    console.log(title)
    // console.log(title, isPublish);
    const result = await NewsService.updatelist({
        id,
      title,
      content,
      category: Number(category),
      cover,
      isPublish: Number(isPublish),
      editTime: new Date(),
    });
    if (result.affectedRows === 1) {
      res.cc(1, "更新成功", result);
    } else {
      res.cc(-1, "更新失败");
    }
  },
  uploadvideo:async (req,res)=>{
    console.log(req.file)
    if (req.file) {
      res.send({
        errno: 0, // 注意：值是数字，不能是字符串
        data: {
          url: "http://localhost:3000" + `/newsvideo/${req.file.filename}`, // 图片 src ，必须
        },
      });
    } else {
      res.send({
        errno: 1, // 只要不等于 0 就行
        message: "失败信息",
      });
    }
  }
};

module.exports = NewsController;
