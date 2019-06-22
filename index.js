const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function postalConversion(mailType, mailWeight) {
    var result;
    var mailWeightCeil = Math.ceil(mailWeight);
    if (mailWeightCeil < 0) // something is wrong with the weight :O
        return -1;
    switch (mailType) {
        case "stamped":
            result = 0.40 + (mailWeightCeil * 0.15);
            break;
        case "metered":
            result = 0.50 + (mailWeightCeil * 0.15);
            break;
        case "flats":
            result = 1.00 + (mailWeightCeil * 0.15);
            break;
        case "retail":
            if (mailWeightCeil >= 1 && mailWeightCeil <= 4)
                result = 3.66;
            else if (mailWeightCeil > 4 && mailWeightCeil <= 8)
                result = 4.39;
            else if (mailWeightCeil > 8 && mailWeightCeil <= 12)
                result = 5.19;
            else if (mailWeightCeil > 12)
                result = 5.71;
            break;
        default:
            result = -1;
            break;
    }
    return result;
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.redirect('/postal'))
    .get('/postal', function(req, res) {
        res.render('pages/postal');
    })
    .get('/postal_results', function(req, res) {
        var mailType = req.query.mailType;
        var mailWeight = Number(req.query.mailWeight);
        var result = postalConversion(mailType, mailWeight);
        res.render('pages/postal_results', {
            mailType: mailType,
            mailWeight: Number(mailWeight),
            result: result
        });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
    // .get('/math', function(req, res) {
    //     var operatorMap = {
    //         'plus': '+',
    //         'minus': '-',
    //         'divide': '/',
    //         'multiply': '*'
    //     };
    //     var op1 = Number(req.query.op1);
    //     var op2 = Number(req.query.op2);
    //     var operator = operatorMap[req.query.operator];
    //     var equation = op1.toString() + operator + op2.toString();
    //     var result = eval(equation);
    //     res.render('pages/math', {
    //         equation: equation,
    //         result: result
    //     });
    // })