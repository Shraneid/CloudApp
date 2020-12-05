var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Merged');

    var query = { "recipe_id": "102422" };

    collection.find(query, { "review": 1 }, function (e, docs) {
        res.render('mergedlist', {
            "mergedlist": docs
        });
    });
});

module.exports = router;
