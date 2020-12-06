var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Merged');

    let recipe_id = "102422";

    if (req.query.recipe_id) {
        recipe_id = req.query.recipe_id;
    }

    console.log(typeof recipe_id);
    console.log({ "recipe_id": recipe_id });

    var query = { "recipe_id": recipe_id };

    var queryPromise = collection.find(query);

    queryPromise.then((value) => {
        res.render('mergedlist',
            {
                "mergedlist": value,
                title: "Extraction des commentaires associés à une requête",
                query: "Query 6",
                projection: ["recipe_id", "review", "rating"]
            });
    });
});

module.exports = router;
