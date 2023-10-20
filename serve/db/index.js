const dbConfig =require('./config') 
const mysql = require('mysql')


//连接mysql
function connect() {
  const { host, user, password, database } = dbConfig;
  return mysql.createConnection({
    host,
    user,
    password:'admin123',
    database
  })
}

//新建查询连接
const  querySql=(sql) =>{
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
          // console.log(res)
        }
      })
    } catch (e) {
      reject(e);
    } finally {
      //释放连接
      conn.end();
    }
  })
}

//查询一条语句
const  queryOne=(sql) =>{
  return new Promise((resolve, reject) => {
    querySql(sql).then(res => {
      // console.log('res===',res)
      // console.log(res)
      if (res ) {
        // console.log(res)
        resolve(res);
        
      } else {
        resolve([]);
      }
    }).catch(err => {
      reject(err);
    })
  })
}

module.exports = {
  querySql,
  queryOne
}
