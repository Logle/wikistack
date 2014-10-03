var express = require('express');
var router = express.Router();
var Page = require('../models').Page;

/* GET home page. */
router.get('/', function(req, res) {
  Page.find({}, function(err,pages){
  	//console.log(pages);
  	res.render('index', { title: 'BROWSE MY WIKISTACK', docs: pages });	
  })
});

router.get('/wiki/:url_name', function(req,res,next){
	Page.find({url_name: req.params.url_name}, function(err, thispage){
		// console.log(thispage);
		res.render('onePage', {thispage: thispage[0]});
	})	
})

router.get('/wiki/:url_name/delete', function(req,res,next){
	// console.log('DELETE', req);
	Page.findOneAndRemove({url_name: req.params.url_name}, function(err, thispage){
		// console.log(thispage);
		res.redirect('/');
	})	
	//next();
})

router.get('/wiki/:url_name/update', function(req,res,next){
	//console.log('UPDATE');
	Page.findOne({url_name: req.params.url_name}, function(err,thispage){
		//console.log(thispage);
		res.render('edit',{thispage: thispage});
	})
})

router.post("/wiki/:id/edit",function(req,res,next){
	//console.log("prepare to update")
	//console.log(req.params);
	Page.findById(req.params.id, function(err,thispage){
		//console.log(thispage);
		thispage.title = req.body.title;
		thispage.body  = req.body.body;
		thispage.save();
		res.render('onePage',{thispage: thispage});
	})

})
module.exports = router;





