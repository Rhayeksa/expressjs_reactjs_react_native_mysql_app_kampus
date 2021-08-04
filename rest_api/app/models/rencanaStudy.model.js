module.exports = (sequelize, Sequelize) => {
  const RencanaStudy = sequelize.define("rencanaStudy", {
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
    banyakPertemuan: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter your banyakPertemuan",
        },
        isNumeric: true,
        min: 1,
        max: 10,
      },
    },
  });

  RencanaStudy.removeAttribute("id");
  return RencanaStudy;
};
