const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connection, TestConnection } = require("./db/connection");
const { Question } = require("./db/Model/Questions");
const { Response } = require("./db/Model/Response");
const { where } = require("sequelize");

TestConnection();

/* pesquisar isso */
/* Setando o ejs como view engine */
app.set("view engine", "ejs");

/* Setando o uso de arquivos estáticos css, imgs */
app.use(express.static("public"));

/* possibilita pegar os dados do frontend no backend */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  /* DQL command */
  Question.findAll({ raw: true, order: [["id", "DESC"]] })
    .then((response) => {
      /* Passando dados para o frontend */
      res.render("index", { questions: response });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/questions", (req, res) => {
  res.render("questions");
});

app.post("/salveQuestion", (req, res) => {
  const { title, description } = req.body;
  /* DML command Inserindo  dados na tabela */
  Question.create({ title: title, description: description })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: index.js ~ line 34 ~ Question.create ~ error",
        error
      );
    });
});

/* Passando paramentro na url */
app.get("/question/:id", (req, res) => {
  const id = req.params.id;
  Question.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((response) => {
      if (response != undefined) {
        Response.findAll({
          raw: true,
          where: {
            id: id,
          },
        })
          .then((answers) => {
            res.render("question", { question: response, answers: answers });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/response", (req, res) => {
  const { questionId, body } = req.body;
  Response.create({ body: body, questionId: questionId })
    .then(() => {
      Question.update(
        {
          isAnswered: true,
        },
        {
          where: {
            id: questionId,
          },
        }
      );
      res.redirect(`/question/${questionId}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(8080, (error) => {
  return error ? console.log("Servidor OK") : console.log(error);
});
