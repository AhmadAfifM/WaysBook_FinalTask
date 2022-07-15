const { cart, user, book } = require("../../models");

exports.addCart = async (req, res) => {
  try {
    const data = {
      idBuyer: req.user.id,
      idBooks: req.body.idBooks,
    };

    const checkBook = await cart.findOne({
      where: data,
    });

    if (!checkBook) {
      await cart.create(data);
      res.send({
        status: "success",
        message: `Add cart success!`,
        data,
      });
    } else {
      res.send({
        status: "info",
        message: `The book already added to the cart`,
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server error!",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    let data = await cart.findAll({
      where: { idBuyer: req.user.id },
      include: [
        {
          model: book,
          as: "books",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "desc",
              "publicDate",
              "pages",
              "isbn",
              "fileDoc",
            ],
          },
        },
        {
          model: user,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = data.map((item) => {
      item.books.bookCover = process.env.PATH_FILE + item.books.bookCover;

      return item;
    });

    res.send({
      status: "success",
      message: `Get carts success!`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server error!",
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cart.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data) {
      return res.send({
        status: "Failed!",
        message: `User with id: ${id} not found!`,
      });
    }
    res.send({
      status: "Success!",
      message: `Delete cart id: ${id} success!`,
      data,
    });
    await cart.destroy({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server error!",
    });
  }
};
