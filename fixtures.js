"use strict";

var randomstring = require("randomstring");
const sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./database_mock.db", err => {
  if (err) {
    console.error(err.message);
  }
  console.log("Conectado a la base de datos mock SQLITE3");
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genSQLRelation(idProject, idDriver) {
  let sqlReturn =
    "INSERT INTO project_driver (id_driver, id_project, value) VALUES (" +
    idDriver +
    "," +
    idProject +
    ",";

  switch (idDriver) {
    case 1:
    case 2:
    case 3:
    case 4:
      sqlReturn += "'" + randomstring.generate(12) + "'";
      break;

    case 5:
      sqlReturn += getRandomInt(1, 5);
      break;

    case 6:
      sqlReturn += Date.now() % 2 === 0 ? 0 : 1;
      break;

    case 7:
      sqlReturn += getRandomInt(1, 3);
      break;

    case 8:
      sqlReturn += Date.now() % 2 === 0 ? 1 : 0;
      break;

    case 9:
      sqlReturn += getRandomInt(1, 3);
      break;

    case 10:
    case 11:
    case 12:
      sqlReturn += getRandomInt(1, 5);
      break;

    default:
      // ATPC
      break;
  }
  sqlReturn += ");";
  return sqlReturn;
}

for (let j = 1; j < 13; j++) {
  for (let i = 1; i < 13; i++) {
    console.log(genSQLRelation(j, i));
  }
}
