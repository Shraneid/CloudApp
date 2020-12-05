var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Recipes');

    collection.find({ "ingredients": { $all: ["lettuce", "tomatoes", "onions"] } }, function (e, docs) {
        res.render('recipeslist',
            {
                "recipeslist": docs,
                title: "Liste des recettes qui contiennent :<br>des tomates, des onions et de la salade",
                query: "Query 1",
                projection: ["name", "avg_rating", "ingredients"]
            });
    });
});

module.exports = router;
