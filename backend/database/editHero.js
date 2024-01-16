const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const heroesPath = path.join(__dirname, 'dbfiles', 'Heroes.db');
function editHeroes(values, id) {
    return new Promise((resolve, reject) => {
     
      let db = new sqlite3.Database(heroesPath, async (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          
            
            
            var formatted_names = `name='${values[0]}', real_name='${values[1]}', abilities='${values[2]}', first_appearance='${values[3]}', description='${values[4]}'`
            console.log(formatted_names)

          const queryFetchHeroes = `UPDATE Heroes SET ${formatted_names} where id = ${id}`;
          console.log(queryFetchHeroes)
           

            
            
          
          var  checker = true;
          for(let i = 0; i<values.length; i++){
            if( values[i] == '' || values[i] == null || values[i] == undefined){
              checker = false;
            }

          
        
          }

          if(checker){
            db.all(queryFetchHeroes, [], (err, rows) => {
              if (err) {
                console.error(err.message);
                reject(err);
              }
              
    
              
    
              db.close((err) => {
                if (err) {
                  console.error(err.message);
                  reject(err);
                }
                console.log('Close the database connection.');
                
              });
    
              
            });

            resolve('ok');
          }
          
          resolve('erro')
          
        }
      });
    });
  }

  

module.exports = editHeroes