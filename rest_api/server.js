const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./app/models");
const mahasiswaRouter = require("./app/routers/mahasiswa.router");
const dosenRouter = require("./app/routers/dosen.router");
const mataKuliahRouter = require("./app/routers/mataKuliah.router");
const hasilStudyRouter = require("./app/routers/hasilStudy.router");
const rencanaStudyRouter = require("./app/routers/rencanaStudy.router");

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`\n\tserver run in port ${PORT}\n`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({force: true});

app.use("/Mahasiswa", mahasiswaRouter);
app.use("/Dosen", dosenRouter);
app.use("/Matakuliah", mataKuliahRouter);
app.use("/HasilStudy", hasilStudyRouter);
app.use("/RencanaStudy", rencanaStudyRouter);
app.get("/", (req, res) => {
  res.json({ message: "welcome to Kampus Rest API" });
});
