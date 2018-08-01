"use strict";

// Imports de librerías
var sqlite = require("sqlite-sync");
var express = require("express");
var app = express();

const bodyParser = require("body-parser");

// Conectamos a la base de datos sqlite
sqlite.connect("./database_mock.db");

/**
 * @returns Array El array de proyectos, desde la bbdd
 */
function getAllProjects() {
  return sqlite.run("SELECT * FROM project");
}

/**
 * @param Integer El id del proyecto a extraer
 * @returns Object El objeto de proyecto
 */
function getSingleProject(idProject) {
  let result = sqlite.run("SELECT * FROM project WHERE id = " + idProject);
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

/**
 * @param Integer El id de proyecto cuyos drivers queremos
 * @returns Array Un array de objetos de tipo driver no rankeado
 */
function getNonRankedDriversProject(idProject) {
  let result = sqlite.run(
    `SELECT pj.id_driver AS id, pj.value, dr.name  
    FROM project_driver pj INNER JOIN driver dr ON dr.id = pj.id_driver 
    WHERE dr.type = -1 AND pj.id_project = ` + idProject
  );
  if (result.length > 0) {
    return result;
  } else {
    return null;
  }
}

/**
 * @param Integer El id de proyecto cuyos drivers queremos
 * @returns Array Un array de objetos de tipo driver rankeado
 */
function getRankedDriversProject(idProject) {
  let result = sqlite.run(
    `SELECT pj.id_driver AS id, pj.value, dr.name, dr.type 
    FROM project_driver pj INNER JOIN driver dr ON dr.id = pj.id_driver
    WHERE dr.type <> -1 AND pj.id_project = ` + idProject
  );
  if (result.length > 0) {
    return result;
  } else {
    return null;
  }
}

function getNonRankedDriverProject(idProject, idDriver) {
  let result = sqlite.run(
    `SELECT pj.id_driver AS id, pj.value, dr.name 
    FROM project_driver pj INNER JOIN driver dr ON dr.id = pj.id_driver
    WHERE dr.type = -1 AND pj.id_project = ` +
    idProject +
    ` AND pj.id_driver = ` +
    idDriver
  );
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

function getRankedDriverProject(idProject, idDriver) {
  let result = sqlite.run(
    `SELECT pj.id_driver AS id, pj.value, dr.name 
    FROM project_driver pj INNER JOIN driver dr ON dr.id = pj.id_driver
    WHERE dr.type <> -1 AND pj.id_project = ` +
    idProject +
    ` AND pj.id_driver = ` +
    idDriver
  );
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

function getDriverProject(idProject, idDriver) {

  console.log(`SELECT pj.value, dr.name, dr.type FROM project_driver pj
    INNER JOIN driver dr ON dr.id = pj.id_project
    WHERE pj.id_project = ` +
    idProject +
    ` AND pj.id_driver = ` +
    idDriver);


  let result = sqlite.run(
    `SELECT pj.value, dr.name, dr.type FROM project_driver pj
    INNER JOIN driver dr ON dr.id = pj.id_project
    WHERE pj.id_project = ` +
    idProject +
    ` AND pj.id_driver = ` +
    idDriver
  );
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

function createProjectInDB(name) {
  let sqlGetMaxID = `SELECT (MAX(id) + 1) AS newid FROM project`;
  let resultMaxID = sqlite.run(sqlGetMaxID);

  // if(resultMaxID)


  let sql = `INSERT INTO project (id, bbva_uuid, name, completed) VALUES (15, 'loquesea', '` + name + `', 0)`;
  try {
    let result = sqlite.run(sql);
  } catch (exc) {
    throw exc;
  } finally {
    console.log('Ejecutada la inserción');
  }
  // console.log(result);
}

/**
 * Lo preparamos para accesos CORS sin que de problemas de SameHost e historias...
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/**
 * En esta ruta se extraen los proyectos, de forma que se devuelve la lista completa de ellos,
 * con los drivers rankeados y no rankeados para cada uno de ellos
 */
app.get("/projects", function (request, response) {
  let aReturn = getAllProjects();
  for (let i = 0; i < aReturn.length; i++) {
    aReturn[i].non_ranked_drivers = getNonRankedDriversProject(aReturn[i].id);
    aReturn[i].ranked_drivers = getRankedDriversProject(aReturn[i].id);
  }
  response.header("Content-Type: application/json");
  response.json(aReturn);
});

/**
 * En esta ruta se extraen todos los datos del proyecto con :id como identificador del ID
 * único del proyecto
 */
app.get("/projects/:id", function (request, response) {
  let idProject = request.params.id;
  var aReturn = getSingleProject(idProject);
  aReturn.non_ranked_drivers = getNonRankedDriversProject(idProject);
  aReturn.ranked_drivers = getRankedDriversProject(idProject);
  response.header("Content-Type: application/json");
  response.json(aReturn);
});

/**
 * En esta ruta se etraen los drivers (solo los drivers) de un proyectoi dado
 */
app.get("/projects_drivers/:id", function (request, response) {
  let idProject = request.params.id;
  let aReturn = {};
  aReturn.non_ranked_drivers = getNonRankedDriverProject(idProject);
  aReturn.ranked_drivers = getRankedDriversProject(idProject);
  response.header("Content-Type: application/json");
  response.json(aReturn);
});

/**
 * En esta ruta se extrae un driver para un proyecto concreto
 */
app.get("/projects_driver/:idProject/:idDriver", function (request, response) {
  console.log(request.params);
  let idProject = request.params.idProject;
  let idDriver = request.params.idDriver;
  let aReturn = getDriverProject(idProject, idDriver);
  response.header("Content-Type: application/json");
  response.json(aReturn);
});

app.get("/omfg", function (req, res) {
  console.log('In here');
  // res.send("Here OMFG");
});

app.post('/testpost', function (request, response) {
  /* console.log(request.body.param1);
  console.log(request.body.param2);
  console.log(request.body.param3); */
  console.log(request.body);
  response.send('OK');
});


app.post('/newproject', function (request, response) {
  console.log(request.body);

  if (request.body.hasOwnProperty('name_project')) {
    try {
      createProjectInDB(request.body.name_project);
    } catch (exc) {
      console.log(exc);
      console.log('ERROR DE BASE DE DATOS');
      // return false;   // SAlir de método
      response.send(exc);
    }
    response.send('OK');
  } else {
    response.send('atpc de aqui');
  }
});


/**
 * Ponemos la app a escuchar
 */
app.listen(3003, function (request, response) {
  console.log("Planning services listening on port 3003...");
});
