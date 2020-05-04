 var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
    email:  String,
	username:  String,
	password:  String,
  });
var UserLoginHistorySchema = new Schema({
	date: Date,
	ipv4: String,
	browser: String
});  
  
var VotelistSchema = new Schema({
	titel:  String,
	author: Schema.Types.ObjectId,
	creationdate: Date,
	views: Number,
	totalvotes: Number,
	private: Boolean,
	multiplevote: Boolean,
	onlyaccountvote: Boolean,
	sameIP: Boolean,
});

var VotelistEditorsSchema = new Schema({
	editor: Schema.Types.ObjectId,
	addeditordate: Date
});

var VoteSchema = new Schema({
	id: Schema.Types.ObjectId,
	votes: Number,

});

var VoteHistorySchema = new Schema({
	creator: Schema.Types.ObjectId,
	text: String,
	creationdate: Date,
	

});

var UpVotes = new Schema({
	creator: Schema.Types.ObjectId,
	votedate: Date,	

});

