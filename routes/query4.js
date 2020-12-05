var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Recipes');

    collection.find({ "id": "137739" }, function (e, docs) {
        res.render('recipeslist',
            {
                "recipeslist": docs,
                title: "Note de la recette<br>que vous avez choisie (id: 137739)",
                query: "Query 4",
                projection: ["id", "name", "avg_rating"]
            });
    });
});

module.exports = router;