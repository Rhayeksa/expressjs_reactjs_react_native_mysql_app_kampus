module.exports = (sequelize, Sequelize) => {
  const Mahasiswa = sequelize.define("mahasiswa", {
    nim: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your nim",
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

  return Mahasiswa;
};
