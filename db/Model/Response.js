const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Response = connection.define("response", {
  id: {
    type: DataTypes.SMALLINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
  },
});

Response.sync({ force: false })
  .then((response) => {
    console.log(
      "🚀 ~ file: Response.js ~ line 21 ~ Response.sync ~ response",
      response
    );
  })
  .catch((error) => {
    console.log(
      "🚀 ~ file: Response.js ~ line 26 ~ Response.sync ~ error",
      error
    );
  });

module.exports = { Response };
