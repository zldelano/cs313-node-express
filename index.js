const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post('/', function(req, res) {
        var operatorMap = {
            'plus': '+',
            'minus': '-',
            'divide': '/',
            'multiply': '*'
        };
        var op1 = Number(req.query.op1);
        var op2 = Number(req.query.op2);
        var operator = operatorMap[req.query.operator];
        var equation = op1.toString() + operator + op2.toString();
        var result = eval(equation);
        res.render('pages/math', {
            equation: equation,
            result: result
        });
    })
    .get('/math', function(req, res) {
        var operatorMap = {
            'plus': '+',
            'minus': '-',
            'divide': '/',
            'multiply': '*'
        };
        var op1 = Number(req.query.op1);
        var op2 = Number(req.query.op2);
        var operator = operatorMap[req.query.operator];
        var equation = op1.toString() + operator + op2.toString();
        var result = eval(equation);
        res.render('pages/math', {
            equation: equation,
            result: result
        });
    })
    .get('/math_service', function(req, res) {
        var operatorMap = {
            'plus': '+',
            'minus': '-',
            'divide': '/',
            'multiply': '*'
        };
        var op1 = Number(req.query.op1) + 10;
        var op2 = Number(req.query.op2) + 10;
        var operator = operatorMap[req.query.operator];
        var equation = op1.toString() + operator + op2.toString();
        var result = eval(equation);
        res.json({
            equation: equation,
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