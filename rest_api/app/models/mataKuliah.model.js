module.exports = (sequelize, Sequelize) => {
  const MataKuliah = sequelize.define("mataKuliah", {
    kode: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your kode",
        },
      },
    },
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your nama",
        },
      },
    },
    sks: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter your sks",
        },
        isNumeric: true,
        min: 1,
        max: 6,
      },
    },
    jurusan: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your jurusan",
        },
        customValidator(value) {
          if (value !== "Teknik Informatika" && value !== "Sistem Informasi") {
            throw new Error("jurusan not available");
          }
        },
      },
    },
  });

  return MataKuliah;
};
