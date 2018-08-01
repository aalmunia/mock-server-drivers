"use strict";

const sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./database_mock.db", err => {
  if (err) {
    console.error(err.message);
  }
  console.log("Conectado a la base de datos mock SQLITE3");
});

/* db.all("SELECT * FROM project", function(error, rows) {
    if(error) {
        console.log('ERROR: ');
        console.log(error);                
    } else {
        // return rows;
        // console.log(rows);
        // Para cada fila, sacar sus drivers no rankeados
        // Hay que hacer que espere a los resultados de proyecto y driver
        // Tengo que devolver una Promise
        for(let i = 0; i < rows.length; i++) {
            db.all("SELECT * FROM project_driver WHERE is_ranked = 0 AND id_project = " + rows[i].id, function(errorDrivers, rowsDrivers) {
                rows[i].nonRankedDrivers = rowsDrivers;
            });
            db.all("SELECT * FROM project_driver WHERE is_ranked = 1 AND id_project = " + rows[i].id, function(errorRankedDrivers, rowsRankedDrivers) {
                rows[i].rankedDrivers = rowsRankedDrivers;
            });
            console.log('ROW ' + i);
            console.log(rows[i]);
        }
    }
}); */

async function testAwaitAsync(sqlQuery) {
    db.all(sqlQuery, async function(error, rows) {
        /* console.log(rows);
        if(!error) {
            return await rows;
        } */
        // return await rows;
        console.log(rows);
        return 'fucxku';
    });
}

testAwaitAsync("SELECT * FROM project").then();

/* function queryAsync(sqlQuery) {
    return new Promise((resolve, reject)=> {
        
        db.all(sqlQuery, async (error, rows) => {
            if(error) {
                reject('WHATTHEFKKK');
            } else {
                resolve(rows);
            }
        });
    });
}

let theRealRows = queryAsync("SELECT * FROM project").then(function(TheRows) {
    // TheRows.map(function(project, indexRow) {
        // queryAsync("SELECT * FROM project_driver WHERE id_project = " + project.id).then(function(TheDrivers){
            // TheRows[indexRow].drivers = TheDrivers;
            // console.log(TheDrivers);
        // });
    // });
    return TheRows;
    // console.log(TheRows);
}).then(function(icantbelievethisshitman) {
    console.log(icantbelievethisshitman);

}); */

