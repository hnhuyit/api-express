var express = require('express');
const { func } = require('joi');
var router = express.Router();
const Tutorial = require('./../models/tutorial');

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
	// console.log(process.env)
 //  Tutorial.find({}).exec(function(err, tutorials){
	// if (err) { console.error(err); }

 //  	res.send(tutorials)
 //  })



	  const { page, size, title } = req.query;
	  var condition = title
	    ? { title: { $regex: new RegExp(title), $options: "i" } }
	    : {};

	  const { limit, offset } = getPagination(page, size);
	Tutorial.paginate(condition, { offset, limit })
	    .then(data => {
	      res.send({

	        totalItems: data.totalDocs,
	        tutorials: data.docs,
	        totalPages: data.totalPages,
	        currentPage: data.page - 1,
	      });
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while retrieving tutorials."
	      });
	    });
//   res.render('index', { title: 'Express' });
});

router.get('/:id', function(req, res) {
	// res.send('respond with a resource');
	// Tutorial.findById(req.params.id).exec(function(err, tutorial){
	// 	if (err) { console.error(err); }
		
	// 	// console.log(tutorial)
	// 	res.send({
	// 		success: true,
	// 		data: tutorial
	// 	})
	// })

	Tutorial.findById(req.params.id)
	    .then(data => {
	      if (!data)
	        res.status(404).send({ message: "Not found Tutorial with id " + id });
	      else res.send(data);
	    })
	    .catch(err => {
	      res
	        .status(500)
	        .send({ message: "Error retrieving Tutorial with id=" + id });
	    });
});

router.post('/', (req, res) => {
	var title = req.body.title;
	var description = req.body.description;

	// Validate request
	if (!title) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	var newtutorial = new Tutorial({
		title: title,
		description: description,
    	published: req.body.published ? req.body.published : false
	})

	// Save Tutorial in the database
  	newtutorial
	    .save(newtutorial)
	    .then(data => {
	      res.send(data);
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the Tutorial."
	      });
	    });

	// newtutorial.save(function (error, data) {
	// 	if (error) {
	// 		console.log(error)
	// 	}
	// 	res.send({
	// 		success: true,
	// 		data: data
	// 	})
	// })
})

router.put('/:id', (req, res) => {

	// Tutorial.findById(req.params.id, function (error, tutorial) {
	//   if (error) { console.error(error); }

	//   tutorial.title = req.body.title
	//   tutorial.description = req.body.description
	//   tutorial.save(function (error, data) {
	// 		if (error) {
	// 			console.log(error)
	// 		}
	// 		res.send({
	// 			success: true,
	// 			data: data
	// 		})
	// 	})
	// })


	if (!req.body) {
	    return res.status(400).send({
	      message: "Data to update can not be empty!"
	    });
	  }


  	const id = req.params.id;
  	Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
	    .then(data => {
	      if (!data) {
	        res.status(404).send({
	          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
	        });
	      } else res.send({ message: "Tutorial was updated successfully." });
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Error updating Tutorial with id=" + id
	      });
	    });
})

router.delete('/:id', (req, res) => {
	// Tutorial.remove({
	// 	_id: req.params.id
	// }, function(err, tutorial){
	// 	if (err)
	// 		res.send(err)
	// 	res.send({
	// 		success: true
	// 	})
	// })

	Tutorial.findByIdAndRemove(req.params.id)
	    .then(data => {
	      if (!data) {
	        res.status(404).send({
	          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
	        });
	      } else {
	        res.send({
	          message: "Tutorial was deleted successfully!"
	        });
	      }
	    })
	    .catch(err => {
	      res.status(500).send({
	        message: "Could not delete Tutorial with id=" + id
	      });
	    });
})

router.delete('/', (req, res) => {
	Tutorial.deleteMany({})
	    .then(data => {
	      res.send({
	        message: `${data.deletedCount} Tutorials were deleted successfully!`
	      });
	    })
	    .catch(err => {
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while removing all tutorials."
	      });
	    });
})

router.get('/published', (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
})


module.exports = router;
