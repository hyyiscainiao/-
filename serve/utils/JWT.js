const jwt = require("jsonwebtoken");

const secretKey = "AdminHyy";

const JWT={
    generateToken :function (payload, exprires) {
        const token =
          "Bearer " +
          jwt.sign(payload, secretKey, {
            expiresIn: exprires,
          });
        return token;
      },
      verifyToken : function (value) {
        const token = value.split(" ")[1];
        // console.log(token)
        return jwt.verify(token, secretKey, function (err, payload) {
          if (err) {
            console.log("verify error", err);
            return false
          }
          // https://www.cnblogs.com/yourgrandfather/p/17163122.html
          const newToken=JWT.generateToken({id:payload.id,username:payload.username},"1d")
          // console.log(newToken)
          return newToken
        });

      },
      getpayload:function(value){
        const token = value.split(" ")[1];
        return jwt.verify(token,  secretKey, (err,payload) => {
          if (err) {
            console.log("verify error", err);
            return false
          }
          // console.log(payload)
          return payload
        });
      }
}
// 生成token


// 验证token


module.exports =JWT