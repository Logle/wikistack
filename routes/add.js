var express = require('express');
var router = express.Router();

   /* GET users listing. */
router.get('/', function(req, res) {
  // res.send('respond with a resource');
  res.render('add');
});

router.post('/submit', function(req, res) {
  	var models = require('../models/');
  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables her
    var generateUrlName = function(name) {
	  if (typeof name != "undefined" && name !== "") {
	    // Removes all non-alphanumeric characters from name
	    // And make spaces underscore
	    return name.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
	  } else {
	    // Generates random 5 letter string
	    return Math.random().toString(36).substring(2,7);
	  }
	};	

	// console.log(req.body.body)
  	var p = new models.Page({ "title": req.body.title, "body": req.body.body, "url_name": generateUrlName(req.body.title)});
  
  // console.log("this is ---",p)
  	p.save(); // this is to save the new page
  	res.redirect('/');
});


module.exports = router;












