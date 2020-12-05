var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Recipes');

    collection.find({ "ingredients": { $nin: ["tomatoes", "tomato", "onions", 'onion'] } }, function (e, docs) {
        res.render('recipeslist',
            {
                "recipeslist": docs,
                title: "Liste des recettes pour<br>les allergies aux tomates et aux oignons",
                query: "Query 2",
                projection: ["name", "avg_rating", "ingredients"]
            });
    });
});

module.exports = router;