module.exports = (sequelize, Sequelize) => {
  const HasilStudy = sequelize.define("hasilStudy", {
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
    semester: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your semester",
        },
        isNumeric: true,
      },
    },
    absen: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your absen",
        },
        isNumeric: true,
        min: 0,
        max: 10,
      },
    },
    tugas: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your tugas",
        },
        isNumeric: true,
        min: 0,
        max: 100,
      },
    },
    uts: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your uts",
        },
        isNumeric: true,
        min: 0,
        max: 100,
      },
    },
    uas: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your uas",
        },
        isNumeric: true,
        min: 0,
        max: 100,
      },
    },
    nilai: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your nilai",
        },
        isNumeric: true,
        min: 0,
        max: 100,
      },
    },
    kriteria: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your kriteria",
        },
      },
    },
  });

  HasilStudy.removeAttribute("id");
  return HasilStudy;
};
