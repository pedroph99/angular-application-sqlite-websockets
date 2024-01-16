const { OPEN_CREATE } = require('sqlite3');

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const heroesPath = path.join(__dirname, 'dbfiles', 'Heroes.db');

function getHeroes() {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(heroesPath, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
       

        const queryFetchHeroes = 'SELECT * FROM Heroes';
        const heroesJson = {
          heroes: []
        };

        db.all(queryFetchHeroes, [], (err, rows) => {
          if (err) {
            console.error(err.message);
            reject(err);
          }

          rows.forEach((hero) => {
            heroesJson.heroes.push(hero);
          });

          db.close((err) => {
            if (err) {
              console.error(err.message);
              reject(err);
            }
            
          });

          resolve(heroesJson);
        });
      }
    });
  });
}

// Exemplo de como usar a função getHeroes de forma assíncrona
async function main() {
  try {
    const heroes = await getHeroes();
    
    return heroes
  } catch (error) {
    console.error(error);
  }
}



module.exports = getHeroes

const teste = getHeroes()

