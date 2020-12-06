var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('Recipes');

    let kcal = 100;
    let glucide = 40;
    let prot = 20;

    if (req.query.kcal) {
        kcal = parseInt(req.query.kcal);
    }
    if (req.query.glucide) {
        glucide = parseInt(req.query.glucide);
    }
    if (req.query.prot) {
        prot = parseInt(req.query.prot);
    }

    console.log(typeof kcal);
    console.log({ "kcal": kcal, "glucide": glucide, "prot": prot });

    var query =
    {
        $and: [
            {
                "nutrition.0":    //kcal
                    { $lte: kcal }
            },
            {
                "nutrition.2":   //glucide
                    { $lte: glucide }
            },
            {
                "nutrition.4":   //prot
                    { $gte: prot }
            },
            {
                "avg_rating":
                    { $gte: 4 }
            }
        ]
    };

    console.log(JSON.stringify(query));

    var queryPromise = collection.find(query);

    queryPromise.then((value) => {
        res.render('mergedlist',
            {
                "mergedlist": value,
                title: "Les Recettes “healthy”",
                query: "Query 7",
                projection: ["name", "avg_rating", "ingredients", "tags"]
            });
    });
});



module.exports = router;
