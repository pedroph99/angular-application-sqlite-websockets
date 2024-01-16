const { OPEN_CREATE } = require('sqlite3');

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const heroesPath = path.join(__dirname, 'dbfiles', 'Heroes.db');

function createHeroes(values) {
    return new Promise((resolve, reject) => {
     
      let db = new sqlite3.Database(heroesPath, async (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          
            
            
            var formatted_names = `null, '${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}'`
          

          const queryFetchHeroes = `INSERT INTO Heroes values (${formatted_names})`;
          
           

            
            
          
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


  

  module.exports = createHeroes


