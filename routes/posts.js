var express = require('express');
const { func } = require('joi');
var router = express.Router();
const Post = require('./../models/post');



router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
	// console.log(process.env)
  Post.find({}).exec(function(err, posts){
	if (err) { console.error(err); }

  	res.send(posts)
  })

//   res.render('index', { title: 'Express' });
});


router.get('/:id', function(req, res, next) {
	// res.send('respond with a resource');
	Post.findById(req.params.id).exec(function(err, post){
		if (err) { console.error(err); }
		
		// console.log(post)
		res.send({
			success: true,
			data: post
		})
	})
});


router.post('/create', (req, res) => {
	var title = req.body.title;
	var description = req.body.description;
	var newPost = new Post({
		title: title,
		description: description
	})

	newPost.save(function (error, data) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true,
			data: data
		})
	})
})
router.post('/:id', (req, res) => {

	Post.findById(req.params.id, function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
	  post.save(function (error, data) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true,
				data: data
			})
		})
	})
})

router.get('/del/:id', (req, res) => {
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

module.exports = router;
