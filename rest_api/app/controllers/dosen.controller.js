const db = require("../models");
const Model = db.dosen;
const Op = db.Sequelize.Op;

exports.addOne = (req, res) => {
  Model.create(req.body)
    .then((data) => {
      res.status(200).send({
        message: "Successed",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.errors[0].message,
        data: null,
      });
    });
};

exports.findAll = (req, res) => {
  let keyword = req.query.keyword;
  if (keyword >= 0) {
    keyword = { nid: { [Op.like]: `${keyword}%` } };
  } else if (keyword) {
    keyword = { nama: { [Op.like]: `%${keyword}%` } };
  } else if ((keyword = undefined)) {
    keyword = null;
  }

  Model.findAll({
    where: keyword,
  })
    .then((data) => {
      if (data == 0) {
        res.status(404).send({
          message: "Empty!",
          data: data,
        });
      } else {
        res.status(200).send({
          message: "Successed",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.errors[0].message,
        data: null,
      });
    });
};

exports.findByKey = (req, res) => {
  const nid = req.params.nid;

  Model.findOne({ where: { nid: nid } })
    .then((data) => {
      if (data == null) {
        res.status(404).send({
          message: `nid ${nid} not found!`,
          data: data,
        });
      } else {
        res.status(200).send({
          message: "Successed",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.errors[0].message,
        data: null,
      });
    });
};

exports.updateByKey = (req, res) => {
  const nid = req.params.nid;

  Model.update(req.body, { where: { nid: nid } })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "Successed",
        });
      } else {
        res.status(404).send({
          message: `Code ${kode} not found!`,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.errors[0].message,
        data: null,
      });
    });
};

exports.deleteByKey = (req, res) => {
  const nid = req.params.nid;

  Model.destroy({ where: { nid: nid } })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "Successed",
        });
      } else {
        res.status(404).send({
          message: `nid ${nid} not found!`,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.errors[0].message,
        data: null,
      });
    });
};
