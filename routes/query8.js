var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Merged');

    let nb_limit = 10;

    if (req.query.nb_limit) {
        nb_limit = parseInt(req.query.nb_limit);
    }

    console.log(nb_limit);

    var query = [
        {
            $match: {
                avg_rating: { $gte: 5 }
            }
        },
        {
            $group: {
                _id: "$recipe_id",
                Date_submitted: { $min: "$submitted" },
                Nb_of_reviews: { $sum: 1 }
            }
        },

        { $sort: { Nb_of_reviews: 1 } },
        { $limit: nb_limit }
    ];

    var queryPromise = collection.aggregate(query);

    queryPromise.then((value) => {
        res.render('mergedlist',
            {
                "mergedlist": value,
                title: "Les recettes les moins plébiscités<br>(Notes élevés, nombre de reviews faible)",
                query: "Query 8",
                projection: []
            });
    });
});

module.exports = router;