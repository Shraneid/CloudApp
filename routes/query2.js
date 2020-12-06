var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Recipes');

    collection.find({ "ingredients": { $nin: ["milk", "eggs"] } }, function (e, docs) {
        res.render('recipeslist',
            {
                "recipeslist": docs,
                title: "Liste des recettes pour<br>les allergies au lait et aux oeufs",
                query: "Query 2",
                projection: ["name", "avg_rating", "ingredients"]
            });
    });
});

module.exports = router;