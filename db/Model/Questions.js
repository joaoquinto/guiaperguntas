/* DataType possui os tipos de dados mais explicados */
const { Sequelize, DataTypes } = require("sequelize");
const { connection } = require("../connection");

/* Modelando tabela com Sequelize */
const Question = connection.define("question", {
  id: {
    type: DataTypes.SMALLINT,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    /* CHAR */
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    /* VARCHAR */
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isAnswered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

/*
 * Criando tabela com Sequelize
 * obs: force informa que só é para criar a tabela se ele não existir LIKE IF NOT EXISTS
 */
Question.sync({ force: false })
  .then((response) => {})
  .catch((error) => {
    console.log("🚀 ~ file: questions.js ~ line 28 ~ error", error);
  });

module.exports = { Question };
