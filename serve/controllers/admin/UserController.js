const UserService = require("../../services/admin/UserService");

const { generateToken, getpayload } = require("../../utils/JWT");
const bcrypt = require("bcryptjs");

const UserController = {
  login: async (req, res) => {
    const result = await UserService.login(req.body);
    if (result === 0) {
      res.cc(-1, "不存在用户");
    } else {
      const isPass = await bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (!isPass) {
        return res.status(422).cc(-1, "密码错误");
      } else {
        const token = generateToken(
          { id: result.id, username: result.username },
          "1d"
        );
        res.header("Authorization", token);
        res.cc(1, "ActionType:OK", result);
      }
    }
  },
  upload: async (req, res) => {
    console.log(req.body, req.file);
    const { name, gender, desc } = req.body;
    const token = req.headers["authorization"];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    const payload = getpayload(token);

    const result = await UserService.upload({
      id: payload.id,
      username: name,
      introduction: desc,
      gender: Number(gender),
      avatar,
    });
    if (result.length === 0) {
      res.cc(-1, "更新失败");
    }
    res.cc(1, "更新成功", result);
  },
  add: async (req, res) => {
    // console.log(req.body, req.file);
    const { name, role, pass, gender, desc } = req.body;
    const token = req.headers["authorization"];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    const payload = getpayload(token);
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    password = bcrypt.hashSync(pass, 10);

    const result = await UserService.add({
      id: payload.id,
      username: name,
      role,
      password,
      introduction: desc,
      gender: Number(gender),
      avatar,
    });
    if (result.affectedRows === 1) {
      res.cc(1, "添加成功", result);
    } else {
      res.cc(-1, "添加失败");
    }
  },
  getlist: async (req, res) => {
    const {currentPage,pageSize,search}=req.query
    console.log(currentPage,pageSize)
    const {total,result} = await UserService.getlist(currentPage,pageSize,search);
    const count=total[0].total
    if (result.length !== 0) {
      res.cc(1, "获取成功", {result,count});
    } else {
      res.cc(-1, "获取失败");
    }
  },
  delList: async (req, res) => {
    const result = await UserService.delList(req.params.id);
    if (result.affectedRows === 1) {
      res.cc(1, "删除成功");
    } else {
      res.cc(-1, "删除失败");
    }
  },
  update: async (req, res) => {
    let { id, username, password, introduction, role } = req.body;
    password = password > 20 ? password : bcrypt.hashSync(password, 10);
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    console.log(password);

    const result = await UserService.update({
      id,
      username,
      role: Number(role),
      password,
      introduction,
    });
    if (result.affectedRows === 1) {
      res.cc(1, "添加成功");
    } else {
      res.cc(-1, "添加失败");
    }
  },
};

module.exports = UserController;
