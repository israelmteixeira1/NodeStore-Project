'use strict'

//200 - Ok, 201 - created, 400 - badrequest, 401 - não autenticado, 403 - acesso negado
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();
mongoose.connect(config.connectionString);

const Product = require('./models/product');
const Custumer = require('./models/customer');
const Order = require('./models/order');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(express.json({
   limit: '5mb' 
}));
app.use(express.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers',customerRoute);
app.use('/orders', orderRoute);

module.exports = app;