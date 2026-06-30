const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const categoria = req.body.categoria.toLowerCase();

        cb(
            null,
            path.join(__dirname, "../public/assets", categoria)
        );

    },

    filename: function (req, file, cb) {

        const nombre =
            Date.now() + path.extname(file.originalname);

        cb(null, nombre);

    }

});

const upload = multer({

    storage

});

module.exports = upload;