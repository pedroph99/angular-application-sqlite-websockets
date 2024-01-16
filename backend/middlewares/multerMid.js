
const path = require('path')
const multer = require('multer');
const photos_destination = path.join(__dirname, '..', 'fotos');
const id_max = require('../../backend/database/maxId')
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('MULTER ENTERED')
    cb(null, photos_destination);
  },
  filename: async (req, file, cb) => {
    const max_id = await  id_max();
    
    cb(null, 'hero'+ '-' + (max_id['MAX(id)']+1) + '.jpeg');
  }
});


// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
