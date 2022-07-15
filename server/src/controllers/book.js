const { book } = require("../../models");

const filetype = ["image/png", "image/jpeg", "image/JPEG", "image/PNG"];

exports.addBook = async (req, res) => {
  try {
    console.log("DISINI ", req.files);
    const fileImage = req.files.file.find((i) => filetype.includes(i.mimetype));
    const fileDoc = req.files.file.find(
      (i) => i.mimetype === "application/pdf"
    );

    if (!(fileImage && fileDoc)) {
      return res.send({
        status: "failed!",
        message: "Image or Pdf must be Upload!",
      });
    }

    const data = {
      title: req.body.title,
      publicDate: req.body.publicDate,
      pages: req.body.pages,
      isbn: req.body.isbn,
      price: req.body.price,
      desc: req.body.desc,
      bookCover: fileImage.filename,
      fileDoc: fileDoc.filename,
      author: req.body.author,
      idUser: req.body.idUser,
    };

    let newData = await book.create(data);

    res.send({
      status: "success!",
      message: `Add book ${req.body.title} success!`,
      newData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server Error",
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    let data = await book.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      item.bookCover = process.env.PATH_FILE + item.bookCover;

      return item;
    });

    res.send({
      status: "Success!",
      message: "Get books success!",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await book.findOne({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (data == null) {
      res.send({
        status: "Failed!",
        message: `Book with id: ${id} not found!`,
      });
    } else {
      data.bookCover = process.env.PATH_FILE + data.bookCover;

      res.send({
        status: "Success!",
        message: `Get book id: ${id} success!`,
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const newData = {
      title: req.body.title,
      publicDate: req.body.publicDate,
      pages: req.body.pages,
      isbn: req.body.isbn,
      price: req.body.price,
      desc: req.body.desc,
      author: req.body.author,
    };

    if (req.files.file) {
      const fileImage = req.files.file.find((i) =>
        filetype.includes(i.mimetype)
      );
      const fileDoc = req.files.file.find(
        (i) => i.mimetype === "application/pdf"
      );

      if (fileImage) newData.bookCover = fileImage.filename;
      if (fileDoc) newData.fileDoc = fileDoc.filename;
    }

    const id = req.params.id;
    const data = await book.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data) {
      return res.send({
        status: "Failed!",
        message: `Book with id: ${id} not found!`,
      });
    }

    await book.update(newData, {
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success!",
      message: `Update book Id: ${id} Success!`,
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await book.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!data) {
      return res.send({
        status: "Failed!",
        message: `Book with id: ${id} not found!`,
      });
    }
    await book.destroy({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success!",
      message: `Delete book id: ${id} success!`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};
