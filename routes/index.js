var express = require('express');
var router = express.Router();

const userModel = require('./users');
const postModel = require('./posts');
const passport = require('passport');
const upload = require("./multer")

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
//login
router.get('/', function(req, res, next) {
  res.render('login', {error: req.flash('error')});
});
router.get('/login', function(req, res, next) {
  res.redirect('/');
});


//singup
router.get('/singup', function(req, res, next) {
  res.render('singup');
})

//profile
router.get('/profile', isLoggedLn, async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user       //this will get username
  })
  .populate("posts")      //get users post in profile
  console.log(user);
  res.render('profile', {user});
});


//feed
router.get('/feed', isLoggedLn, function(req, res, next) {
  res.render("feed");
});


//upload
router.post('/upload', isLoggedLn, upload.single('file'), async function(req, res, next){
  if(!req.file){
    res.status(404).send("No files were uploaded");
  }
  // res.send("File uploaded successfully")
  //creating file as a post
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    image: req.file.filename,     //filename is taken from multer
    postText: req.body.filecaption, //postText is taken from profile.ejs(upload)
    user: user._id
  });

  //this would update user's post array with his post id
  user.posts.push(post._id);
  await user.save();
  res.redirect("profile");
})

// on register
router.post("/register", function(req, res){
  // const userData = new userModel({
  //   username: req.body.username,
  //   email: req.body.email,
  //   fullName: req.body.fullName,
  // })
    const {username, email, fullName } = req.body;
    const userData = new userModel({ username, email, fullName});

    userModel.register(userData, req.body.password)
    .then(function(){
      passport.authenticate("local")(req, res, function(){
        res.redirect("/feed");
      })
    })
});


// on login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/feed",
  failureRedirect: "/",
  failureFlash: true,       //to flash login error
}), function(req, res){
});


// on logout
router.get("/logout", function(req, res){
  req.logout(function(err){
    if (err) {return next(err); }
    res.redirect('/');
  });
});


//forgot
router.get("/forgot", function(req,res) {
  res.send("here you can reset your password");
});


function isLoggedLn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}

router.get('/alluserposts', async function (req, res, next) {
  // searching user
  let user = await userModel.findOne({_id: "65b66028ba821aecbcfe532d"})
  .populate('posts');
  // this would give there posts
  res.send(user);
  // this would give user
})

//create user
router.get('/createuser', async function (req, res, next) {
  let createduser = await userModel.create({
    username: "ubednama",
    password: "ubednama",
    posts: [],
    email: "shahidkhan.ak18@gmail.com",
    fullName: "Ubed Khan",
  });

  res.send(createduser);
});



//create post
router.get('/createpost', async function (req, res, next) {
  let createdpost = await postModel.create({
    postText: "Hello world!!, this is post 2",
    user: "65b66028ba821aecbcfe532d",
    // value for user would be user id
  });

  // here we would update user with post id(vice-versa stuff)
  let user = await userModel.findOne({_id: "65b66028ba821aecbcfe532d"});
  // this would find user
  user.posts.push(createdpost._id);
  // this would update post id to user
  await user.save();
  // this would save everything

  res.send(createdpost);
})


module.exports = router;
