const multer = require("multer");

exports.uploadFileImage = (File) => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "uploads");
    },
    filename: function (req, file, callback) {
      // Remove SPACE from original name with /\s/g,""
      callback(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = function (req, file, callback) {
    if (file.fieldname === File) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|PDF|pdf)$/)) {
        req.fileValidationError = {
          message: "Only Image and PDF files are allowed to upload!",
        };

        return callback(
          new Error("Only Image and PDF files are allowed to upload!"),
          false
        );
      }
    }
    // if there's no file upload
    callback(null, true);
  };

  const maxSize = 10 * 1000 * 1000;
  const limits = {
    fileSize: maxSize,
  };

  const upload = multer({
    storage,
    fileFilter,
    limits,
  }).fields([{ name: File, maxCount: 2 }]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      }
      if (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.send({
            message: "Max file Sized 10MB!",
          });
        }
        return res.send(err);
      }
      return next();
    });
  };
};

// // import package here

// const path = require("path");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.fieldname === "bookCover") {
//       cb(null, "../../uploads/image");
//     } else if (file.fieldname === "fileDoc") {
//       cb(null, "../../uploads/docs");
//     }
//   },
//   filename: (req, file, cb) => {
//     if (file.fieldname === "bookCover") {
//       cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
//     } else if (file.fieldname === "fileDoc") {
//       cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
//     }
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10,
//   },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   },
// }).fields([
//   {
//     name: "bookCover",
//     maxCount: 1,
//   },
//   {
//     name: "fileDoc",
//     maxCount: 1,
//   },
// ]);

// function checkFileType(file, cb) {
//   if (file.fieldname === "bookCover") {
//     if (
//       file.mimetype === "application/pdf" ||
//       file.mimetype === "application/msword"
//     ) {
//       // check file type to be pdf, doc, or docx
//       cb(null, true);
//     } else {
//       cb(null, false); // else fails
//     }
//   } else if (file.fieldname === "fileDoc") {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/gif"
//     ) {
//       // check file type to be pdf, doc, or docx
//       cb(null, true);
//     } else {
//       cb(null, false); // else fails
//     }
//   }
// }

// exports.uploadFile = upload;
