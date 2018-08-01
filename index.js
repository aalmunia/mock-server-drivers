'use strict';

/**
 * Objetivos:
 * 
 * 1.- Ejecutamos una consulta en base de datos. Queremos poder almacenar el valor de la consulta
 * en una variable, y luego usarla para hacer mas consultas.
 * 2.- ¿Cómo hacemos N consultas de forma recursiva?
 */


var express = require('express');
var app = express();
var randomstring = require("randomstring");

const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database_mock.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado a la base de datos mock SQLITE3');
  });

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNonRankedDriver(iWhatDriver) {
    let oReturn = {};
    
    switch(iWhatDriver) {
        case 0:
            oReturn.name = "Impact category";
        break;

        case 1:
            oReturn.name = "Impact type";
        break;

        case 2:
            oReturn.name = "Program";
        break;

        case 3:
            oReturn.name = "Subprogram";
        break;
    }
    oReturn.value = randomstring.generate(8);
    return oReturn;
}

function generateRankedDriver() {
    let oReturn = {};
    oReturn.name = randomstring.generate(12);
    oReturn.type = getRandomInt(0, 2);
    if(oReturn.type === 0) {
        oReturn.value = (Date.now() % 2 === 0) ? true : false;
    } else {
        if(oReturn.type === 1) {
            oReturn.value = getRandomInt(0, 2);
        } else {
            oReturn.value = getRandomInt(1,5);
        }
    }
    return oReturn;
}


function generateMockProject() {
    let oReturn = {};
    oReturn.name = randomstring.generate(15);
    oReturn.id = randomstring.generate(3);
    oReturn.completed = (Date.now() % 2 === 0) ? true : false;
    oReturn.nonRankedDrivers = [];
    oReturn.rankedDrivers = [];
    for(let i = 0; i < 4; i++) {
        oReturn.nonRankedDrivers.push(generateRandomNonRankedDriver(i));
        oReturn.rankedDrivers.push(generateRankedDriver());
    }
    return oReturn;
}

function generateRandomProjects(iHowMany) {
    let oReturn = [];
    for(let i = 0; i < iHowMany; i++) {
        oReturn.push(generateMockProject());
    }
    return oReturn;
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/projects', function(request, response) {
    response.header("Content-Type: application/json");
    response.json(generateRandomProjects(5));
});

async function makeSQLQuery(sqlQuery, connObject) {
    connObject.all(sqlQuery, function(error, rows) {
        if(error) {

        } else {
            return await rows;
        }
    });
}

// @todo: Promisify the SQL queries
function getDatabaseProjects() {    
    db.all("SELECT * FROM project", function(error, rows) {        
        if(error) {
            // result = await Promise.reject('FU,M8');
            console.log('ofukkk');
        } else {
            // await rows;
            return rows;
        }        
    });    
}

app.get('/projects2', function(request, response) {
    let aProjects = getDatabaseProjects();
    response.header("Conten-Type: application/json");
    response.json(aProjects);
});

app.get('/projects/{id}', function(request, response) {
    // Sacamos ID
    // Leemos de base de datos
    // Obtenemos proyecto
    // Lo dfevolvemos como jSON
})

app.get('/drivers', function(request, response) {
    let aReturn = [];
    for(let i = 0; i < 8; i++) {
        aReturn.push(generateRankedDriver());
    }
    response.header("Conten-Type: application/json");
    response.json(aReturn);    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
