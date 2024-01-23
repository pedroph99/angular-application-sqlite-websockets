const path = require('path')
const multer = require('multer');
const photos_destination = path.join(__dirname, '..', 'temp');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('MULTER ENTERED')
    console.log(file)
    cb(null, photos_destination);
  },
  filename: async (req, file, cb) => {
    
    
    cb(null, file.originalname);
  }
});


// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
