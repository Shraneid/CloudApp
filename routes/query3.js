var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Recipes');

    collection.find({ $and: [{ "n_steps": { $lte: 10 } }, { "tags": { $in: ["30-minutes-or-less"] } }] }, function (e, docs) {
        res.render('recipeslist',
            {
                "recipeslist": docs,
                title: "Liste des recettes<br>simples et rapide à faire",
                query: "Query 3",
                projection: ["name", "avg_rating", "n_steps", "minutes"]
            });
    });
});

module.exports = router;