var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

var TutorialSchema = new Schema({
    title: String,
    description: String,
    published: Boolean
},{ timestamps: true });

TutorialSchema.method("toJSON", function() {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

TutorialSchema.plugin(mongoosePaginate);

var Tutorial = mongoose.model("Tutorial", TutorialSchema);

// Tutorial.paginate(query, options)
//     .then(result => {})
//     .catch(error => {});
        
module.exports = Tutorial;