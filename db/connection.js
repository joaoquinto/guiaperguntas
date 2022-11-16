const { Sequelize } = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

async function TestConnection() {
  await connection
    .authenticate()
    .then(() => {
      console.log("Connection accept");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { connection, TestConnection };
