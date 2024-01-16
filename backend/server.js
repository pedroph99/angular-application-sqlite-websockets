const express = require('express');
const path = require('path')
const fs = require('fs');

const Websocket = require('ws');
// Cria uma instância do Express
const app = express();
const http = require('http').createServer(app)

const wws = new Websocket.Server({
  server: http
})

var clients = []
wws.on('connection', function(ws){
  console.log('Conectou: ')
  clients.push(ws);
  ws.send('Welcome')
  ws.on('message', function(message){

    clients.forEach(client => {
    
        client.send(message.toString());
      })
    

    
  }
  
  )

  console.log(clients.length)
})
const port = 3000; // Pode alterar para a porta desejada

const upload = require('./middlewares/multerMid');
const  uploadedit = require('./middlewares/multerMidEdit');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))


const heroesFunc = require('./database/getHeroes')
// Define uma rota
const data = require('./infos/info.json');
const createHeroes = require('./database/createHeroes');
const editHeroes = require('./database/editHero');
app.get('/', async (req, res) => {
  const async_call_heroesMethod = await heroesFunc()
  const resp = res.json(async_call_heroesMethod.heroes);
  
  
});

app.get('/photos/:name', (req,res) => {
  console.log('req realizada');
  const files = fs.readdirSync(path.join(__dirname, 'fotos'))
  var rightFile = null;
  files.forEach((file) => {
    console.log(file)
    try{
      if(file.split('-')[1].split('.')[0] == req.params.name){
        rightFile = file;
     }
    }
    catch{
      console.log('invalid file.')
    }
    

    
  })
  if(rightFile == null){
    res.sendFile(path.join(__dirname, 'fotos', 'default.jpeg'))
  }
  else{
    res.sendFile(path.join(__dirname, 'fotos', rightFile))
    console.log('testando foto')
  }
  
  
  
  
  
})


app.post('/herocreate/criar', upload.single('image'),  async (req,res) => {
  console.log('REQ REALIZADA');
  let valores = [];
  const valores_keys = Object.keys(req.body);
  console.log(req.body)
  valores_keys.forEach( (value) => valores.push(req.body[`${value}`]))

  console.log(valores)

  const resultado = await createHeroes(valores);
  console.log(resultado);
  if(valores[5] != ''){
    console.log('testando aqui')
    
  }
  console.log('ok')
  res.redirect('http://localhost:4200')

}


 
  )



  app.post('/heroedit/:id', uploadedit.single('image'), async (req,res) => {
    let valores = [];

    
    const valores_keys = Object.keys(req.body);
    valores_keys.forEach( (value) => valores.push(req.body[`${value}`]))
  
    console.log(valores)
  
    const resultado = await editHeroes(valores, req.params.id);
    console.log(resultado);
   
    res.redirect('http://localhost:4200')
  
  }
  
  
   
    )




// Inicia o servidor
var server = http.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});




