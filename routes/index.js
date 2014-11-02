var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var Page = require('../models').Page;
var User = require('../models').User;

/* GET home page. */
router.get('/', function(req, res) {
  Page.find({}, function(err,pages){
  	//console.log(pages);
  	//console.log(req.cookies);
  	var user = req.cookies['wikistack'];
  	if (user ===undefined) {user = "New User"};
  	res.render('index', { title: 'BROWSE MY WIKISTACK', docs: pages, user: user});	
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
// get new user and add him into the database
router.get("/signup", function(req,res,next){
	// console.log('render signup');
	res.render('signup',{});
});

router.post("/signup/submit", function(req, res, next){
	//console.log('Email:',req.body.email );
	//console.log('Pass: ',req.body.password );
	var hash = bcrypt.hashSync(req.body.password, 10); 
	var u = new User({"email": req.body.email, "password": hash});  u.save();
	res.cookie('wikistack', req.body.email);
	res.redirect('/');
});

router.get("/login", function(req,res,next){
	//console.log('render login');
	res.render('login',{});
});

router.post("/login/submit", function(req,res,next){
	//console.log('render login');
	User.findOne({"email": req.body.email}, function(err, user){
		if (user != null){
			if (bcrypt.compareSync(req.body.password, user['password'])){
				res.cookie('wikistack', req.body.email);	
			};
			res.redirect('/');
		} else res.redirect('/');
	})
});


module.exports = router;





