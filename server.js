const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desertmed',
    password: 'postgres',
    port: 5432,
});

pool.connect();

console.log("Connected to dB!")

const express = require('express');
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


query_island = "SELECT json_build_object('type', 'FeatureCollection','features', json_agg(json_build_object('type','Feature','geometry',ST_AsGeoJSON(ST_Transform(geom, 4326))::json,'properties', t.* ))::json)FROM islands as t"
old_query_island = "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(ST_Transform(geom, 4326))::json)) FROM islands "

app.get('/getIslands', function (req, res) {
    pool.query(query_island, function (err, results) {
        console.log(results.rows[0].json_build_object)
        res.end(JSON.stringify(results.rows[0].json_build_object));
    });
})

app.get('/getTypologies', function (req, res) {
    pool.query('SELECT * FROM typology ORDER BY id ASC ', function (err, results) {
        console.log(results.rows)//[0].json_build_object)
        res.end(JSON.stringify(results.rows))//[0].json_build_object));
    });
})

app.get('/getPhotos/:id', function (req, res) {
    pool.query('SELECT * FROM images WHERE id_island=($1)', [req.params.id],function (err, results) {
        console.log(results)//[0].json_build_object)
        res.end(JSON.stringify(results.rows))//[0].json_build_object));
    });
})

app.listen(8085, () => {
    console.log('Server Started');
});