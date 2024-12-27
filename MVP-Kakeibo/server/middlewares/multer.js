const multer = require("multer");

const uploadImage = (folder) => {
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,

    filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({ storage: storage, fileFilter: function fileFilter (req, file, cb) {
    const type = file.mimetype.startsWith('image/')
    type ? cb(null, true) : cb(new Error('no es un archivo de tipo imagen'))
  } }).single("file");
  return upload;
};

module.exports = uploadImage;
