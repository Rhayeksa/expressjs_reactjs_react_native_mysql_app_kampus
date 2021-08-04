const db = require("../models");
const Model = db.hasilStudy;
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

  let kode = "HS" + req.body.semester + req.body.mahasiswaNim;
  let nilai =
    (req.body.absen / 10) * 10 +
    (req.body.tugas / 100) * 20 +
    (req.body.uts / 100) * 30 +
    (req.body.uas / 100) * 40;
  let kriteria;
  if (nilai >= 80) {
    kriteria = "A";
  } else if (nilai < 80 && nilai >= 70) {
    kriteria = "B";
  } else if (nilai < 70 && nilai >= 60) {
    kriteria = "C";
  } else if (nilai < 60 && nilai >= 50) {
    kriteria = "D";
  } else {
    kriteria = "E";
  }

  const request = {
    kode: kode,
    semester: req.body.semester,
    absen: req.body.absen,
    tugas: req.body.tugas,
    uts: req.body.uts,
    uas: req.body.uas,
    nilai: nilai,
    kriteria: kriteria,
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
      message: "not blank",
      data: null,
    });
    return null;
  }

  let nilai =
    (req.body.absen / 10) * 10 +
    (req.body.tugas / 100) * 20 +
    (req.body.uts / 100) * 30 +
    (req.body.uas / 100) * 40;
  let kriteria;
  if (nilai >= 80) {
    kriteria = "A";
  } else if (nilai < 80 && nilai >= 70) {
    kriteria = "B";
  } else if (nilai < 70 && nilai >= 60) {
    kriteria = "C";
  } else if (nilai < 60 && nilai >= 50) {
    kriteria = "D";
  } else {
    kriteria = "E";
  }

  const request = {
    kode: kode,
    semester: req.body.semester,
    absen: req.body.absen,
    tugas: req.body.tugas,
    uts: req.body.uts,
    uas: req.body.uas,
    nilai: nilai,
    kriteria: kriteria,
    dosenNid: req.body.dosenNid,
    mahasiswaNim: req.body.mahasiswaNim,
    mataKuliahKode: mataKuliahKode,
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
