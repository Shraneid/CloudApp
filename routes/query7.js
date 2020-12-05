var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Merged');

    var query = {
        $and: [
            {
                "nutrition.0":
                    { $lte: 100 }
            },
            {
                "nutrition.2":
                    { $lte: 40 }
            },
            {
                "nutrition.4":
                    { $gte: 20 }
            },
            {
                "avg_rating":
                    { $gte: 4 }
            }]
    };

    collection.find(query, {}, function (e, docs) {
        res.render('mergedlist', {
            "mergedlist": docs
        });
    });
});

module.exports = router;
