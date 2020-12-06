var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Merged');

    var query = [
        {
            $match:
            {
                $and: [{ avg_rating: { $gte: 5 } }, { submitted: { $gte: new Date("2000-01-01"), $lte: new Date("2005-02-28") } }]
            }
        },
        {
            $group: {
                _id: "$recipe_id",
                Nb_review: { $sum: 1 }
            }
        },
        { $sort: { Nb_review: -1 } },
        { $limit: 1 }
    ];

    var queryPromise = collection.aggregate(query);

    queryPromise.then((value) => {
        console.log(value);
        res.render('mergedlist',
            {
                "mergedlist": value,
                title: "La recette du mois !",
                query: "Query 5",
                projection: []
            });
    });
});

module.exports = router;
