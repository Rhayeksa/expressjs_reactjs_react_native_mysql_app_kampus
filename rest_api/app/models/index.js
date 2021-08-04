const dbConfig = require("../configs/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: 3306,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.dosen = require("./dosen.model")(sequelize, Sequelize);
db.mataKuliah = require("./mataKuliah.model")(sequelize, Sequelize);
db.mahasiswa = require("./mahasiswa.model")(sequelize, Sequelize);
db.rencanaStudy = require("./rencanaStudy.model")(sequelize, Sequelize);
db.hasilStudy = require("./hasilStudy.model")(sequelize, Sequelize);

db.dosen.hasMany(db.rencanaStudy);
db.rencanaStudy.belongsTo(db.dosen);

db.mataKuliah.hasMany(db.rencanaStudy);
db.rencanaStudy.belongsTo(db.mataKuliah);

db.mahasiswa.hasMany(db.rencanaStudy);
db.rencanaStudy.belongsTo(db.mahasiswa);

db.dosen.hasMany(db.hasilStudy);
db.hasilStudy.belongsTo(db.dosen);

db.mataKuliah.hasMany(db.hasilStudy);
db.hasilStudy.belongsTo(db.mataKuliah);

db.mahasiswa.hasMany(db.hasilStudy);
db.hasilStudy.belongsTo(db.mahasiswa);

module.exports = db;
