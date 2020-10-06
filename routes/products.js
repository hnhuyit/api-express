var express = require('express')
var router = express.Router();
const Product = require('./../models/products')
const verifyToken = require('./../middlewares/verifyToken');

router.get('/',
  //verifyToken, 
  function (req, res) {
    // res.send('Day la Products API')


    Product.find({}).exec(function(err, products){
        if (err) { console.error(err); }
    
          res.send({
            status: res.statusCode,
            mes: res.statusMessage,
            data: products
          })
      })
})

router.post('/create', (req, res) => {
	var name = req.body.name;
	var unit = req.body.unit;
    var price = req.body.price;
    
	var newProduct = new Product({
		name: name,
        unit: unit,
        price: price
	})

	newProduct.save(function (error, data) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true,
			data: data
		})
	})
})

module.exports = router