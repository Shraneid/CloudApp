var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Merged');

    var query = [
        {
            $match: {
                avg_rating: { $gte: 5 }
            }
        },
        {
            $group: {
                _id: "$recipe_id",
                minDate: { $min: "$submitted" },
                Count: { $sum: 1 }

            }
        },

        { $sort: { Count: 1 } },
        { $limit: 1 }
    ];

    collection.aggregate(query, {}, function (e, docs) {
        res.render('mergedlist', {
            "mergedlist": docs
        });
    });
});

module.exports = router;