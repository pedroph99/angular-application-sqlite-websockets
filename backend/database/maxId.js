
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const heroesPath = path.join(__dirname, 'dbfiles', 'Heroes.db');

let db = new sqlite3.Database(heroesPath);
const sql = 'SELECT MAX(id) from Heroes'
 


async function getMaxId(){
    return new Promise((resolve, reject) => {


      db.get(sql, [], (err, row) => {
        if (err) {
            
          reject(err)
        }
        else{
            console.log(row)
            resolve(row)
            db.close()
        }
      
      });
    })
      // close the database connection
      
      
}
module.exports = getMaxId