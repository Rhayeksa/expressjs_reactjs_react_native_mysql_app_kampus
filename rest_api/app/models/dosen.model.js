module.exports = (sequelize, Sequelize) => {
  const Dosen = sequelize.define("dosen", {
    nid: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your nid",
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
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your gender",
        },
        customValidator(value) {
          if (value !== "Pria" && value !== "Wanita") {
            throw new Error("gender not available");
          }
        },
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter your phone",
        },
        isNumeric: true,
        len: [11, 15],
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please enter your email",
        },
        isEmail: true,
      },
    },
    alamat: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your alamat",
        },
      },
    },
  });

  return Dosen;
};
