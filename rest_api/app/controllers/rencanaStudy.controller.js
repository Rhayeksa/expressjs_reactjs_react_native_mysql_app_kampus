const db = require("../models");
const Model = db.rencanaStudy;
const Op = db.Sequelize.Op;

exports.addOne = (req, res) => {
  if (
    !req.body.dosenNid ||
    !req.body.mahasiswaNim ||
    !req.body.mataKuliahKode
  ) {
    res.status(400).send({
      message: "not blank",
      data: null,
    });
    return null;
  }

  let kode = "RS" + req.body.semester + req.body.mahasiswaNim;

  const request = {
    kode: kode,
    semester: req.body.semester,
    banyakPertemuan: req.body.banyakPertemuan,
    dosenNid: req.body.dosenNid,
    mahasiswaNim: req.body.mahasiswaNim,
    mataKuliahKode: req.body.mataKuliahKode,
  };

  Model.create(request)
    .then((data) => {
      res.status(200).send({
        message: "Successed",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        data: null,
      });
    });
};

exports.findAll = (req, res) => {
  let keyword = req.query.keyword;
  if (keyword) {
    keyword = { kode: { [Op.like]: `${keyword}%` } };
  } else if ((keyword = undefined)) {
    keyword = null;
  }

  Model.findAll({
    where: keyword,
    include: ["dosen", "mahasiswa", "mataKuliah"],
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
      res.status(500).send({
        message: err.message,
        data: null,
      });
    });
};

exports.findByKey = (req, res) => {
  const kode = req.params.kode;

  Model.findOne({
    where: { kode: kode },
    include: ["dosen", "mahasiswa", "mataKuliah"],
  })
    .then((data) => {
      if (data == null) {
        res.status(404).send({
          message: `Code ${kode} not found!`,
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
      res.status(500).send({
        message: err.message,
        data: null,
      });
    });
};

exports.updateByKey = (req, res) => {
  const kode = req.params.kode;
  const mataKuliahKode = req.params.mataKuliahKode;

  if (!req.body.dosenNid || !req.body.mahasiswaNim) {
    res.status(400).send({
      message: "not blank between dosenNid or mahasiswaNim",
      data: null,
    });
    return null;
  }

  const request = {
    semester: req.body.semester,
    banyakPertemuan: req.body.banyakPertemuan,
    dosenNid: req.body.dosenNid,
    mahasiswaNim: req.body.mahasiswaNim,
  };

  Model.update(request, {
    where: { [Op.and]: [{ kode: kode }, { mataKuliahKode: mataKuliahKode }] },
  })
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
      res.status(500).send({
        message: err.message,
        data: null,
      });
    });
};

exports.deleteByKey = (req, res) => {
  const kode = req.params.kode;
  const mataKuliahKode = req.params.mataKuliahKode;

  Model.destroy({
    where: { [Op.and]: [{ kode: kode }, { mataKuliahKode: mataKuliahKode }] },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "Successed",
        });
      } else {
        res.status(404).send({
          message: `Code ${kode} and mata kuliah code ${mataKuliahKode} not found!`,
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        data: null,
      });
    });
};
