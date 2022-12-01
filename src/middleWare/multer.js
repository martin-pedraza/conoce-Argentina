const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '/../../public/'));
	},
	filename: (req, file, cb) => {
		let name = 'images/slide - ' + Date.now() + path.extname(file.originalname);
		cb(null, name);
	}
});

const upload = multer({ storage });

module.exports = upload;
