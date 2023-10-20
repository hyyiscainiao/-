const ProductService = require("../../services/admin/ProductService");

const ProductController = {
  add: async (req, res) => {
    // console.log(req.body, req.file);
    const { name, introduction, detail } = req.body;
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const result = await ProductService.add({
      name: name,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    if (result.affectedRows === 1) {
      res.cc(1, "添加成功", result);
    } else {
      res.cc(-1, "添加失败");
    }
  },
  getlist: async (req, res) => {
    // console.log(req.params.id)
    const result = await ProductService.getlist({ id: req.params.id });
    if (result.length !== 0) {
      res.cc(1, "获取成功", result);
    } else {
      res.cc(-1, "获取失败");
    }
  },
  delList: async (req, res) => {
    const result = await ProductService.delList(req.params.id);
    if (result.affectedRows === 1) {
      res.cc(1, "删除成功");
    } else {
      res.cc(-1, "删除失败");
    }
  },
  updatelist: async (req, res) => {
    // console.log(req.body, req.file);
    const { id, name, introduction, detail } = req.body;
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const result = await ProductService.updatelist({
      id,
      name,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    if (result.affectedRows === 1) {
      res.cc(1, "更新成功", result);
    } else {
      res.cc(-1, "更新失败");
    }
  },
};

module.exports = ProductController;
