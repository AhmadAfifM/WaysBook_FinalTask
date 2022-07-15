const { user } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      status: "customer",
    });
    const data = {
      id: newUser.id,
    };

    const token = jwt.sign(data, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success!",
      message: `Register user ${req.body.name} success!`,
      data: {
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error!",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const existUser = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!existUser) {
      return res.status(400).send({
        status: "failed!",
        message: `User with ${req.body.email} doesn't exists!`,
      });
    }

    const isValid = await bcrypt.compare(req.body.password, existUser.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed!",
        message: "You must register!",
      });
    }

    const data = {
      id: existUser.id,
    };

    const token = jwt.sign(data, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success!",
      message: `Login with user ${existUser.name} success!`,
      data: {
        id: existUser.id,
        name: existUser.name,
        email: existUser.email,
        status: existUser.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed!",
      message: "Server Error!",
    });
  }
};

exports.checkAuth = async (req, res) => {
  // pengecekan id yang memiliki token (diambil dari proses jwt)
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(400).send({
        status: "failed!",
        message: "data user not found!",
      });
    }

    res.send({
      status: "success!",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
        },
      },
    });
  } catch (error) {
    console.log("CheckAuth", error);
    res.status(400).send({
      status: "failed!",
      message: "Server error!",
    });
  }
};
