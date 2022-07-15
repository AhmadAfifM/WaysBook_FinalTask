const { user, book } = require("../../models");

const filetype = ["image/png", "image/jpeg", "image/JPEG", "image/PNG"];

exports.addUser = async (req, res) => {
  try {
    const fileImage = req.files.imageFile.find((i) =>
      filetype.includes(i.mimetype)
    );

    const data = {
      email: req.body.name,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      status: req.body.status,
      gender: req.body.gender,
      address: req.body.address,
      image: fileImage.filename,
      idUser: req.body.idUser,
    };

    let newData = await user.create(data);
    res.send({
      status: "success",
      message: `Add user ${req.body.name} success!`,
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

exports.getUsers = async (req, res) => {
  try {
    let data = await user.findAll({
      where: {},
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = data.map((item) => {
      item.image = process.env.PATH_FILE + item.image;

      return item;
    });
    res.send({
      status: "Success!",
      message: "Get users success!",
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

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await user.findOne({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (data == null) {
      res.send({
        status: "Failed!",
        message: `User with id: ${id} not found!`,
      });
    } else {
      if (data.image) {
        data.image = process.env.PATH_FILE + data.image;
      } else {
        data.image = null;
      }

      res.send({
        status: "Success!",
        message: `Get user id: ${id} success!`,
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

exports.updateUser = async (req, res) => {
  try {
    const newData = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      status: req.body.status,
      gender: req.body.gender,
      address: req.body.address,
    };
    console.log(req.files);
    if (req.files.imageFile.length > 0) {
      const fileImage = req.files.imageFile.find((i) =>
        filetype.includes(i.mimetype)
      );
      newData.image = fileImage.filename;
    }

    const id = req.params.id;
    const data = await user.findOne({
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
    console.log(newData);
    await user.update(newData, {
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success!",
      message: `Update User Id: ${id} Success!`,
      newData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await user.findOne({
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
    await user.destroy({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success!",
      message: `Delete user id: ${id} success!`,
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
