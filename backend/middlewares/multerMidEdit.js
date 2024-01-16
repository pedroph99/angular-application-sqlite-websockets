
const path = require('path')
const multer = require('multer');
const photos_destination = path.join(__dirname, '..', 'fotos');
const id_max = require('../../backend/database/maxId')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log('MULTER ENTERED')
      cb(null, photos_destination);
    },
    filename: async (req, file, cb) => {
        console.log('OKKKKKKKK PORRA')
     console.log(req.body.id)
     console.log('OKKKKKKKK PORRA')
      
      cb(null, 'hero'+'-'+req.body.id+ '.jpeg');
    }
  });
  
  
  // Create the multer instance
  const upload = multer({ storage: storage });
  module.exports = upload