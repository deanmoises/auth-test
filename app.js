// =============
// CONFIGURATION
// =============

// packages
var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

// connection to database
mongoose.connect("mongodb://localhost/recruitment_app"), { useNewUrlParser: true };

// setting the default view engine
app.set("view engine", "ejs");

// adding body parser
app.use(bodyParser.urlencoded({ extended: true }));

// defining express session
app.use(require("express-session")({
  secret: "Squad 5 App",
  resave: false,
  saveUninitialize: false
}));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

// passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============
// ROUTES
// =============
app.get("/", (req, res) => {
  res.render("landing")
});

app.get("/home", (req, res) => {
  res.render("home")
});

app.get("/home", (req, res) => {
  res.render("home")
});

// secret route - when successfully logged in
app.get("/secret", isLoggedIn,(req, res) => {
  res.render("secret");
});

// registration routes - 2 routes | get and post
app.get("/register", (req, res) => {
  res.render("register");
});

// registration logic
app.post("/register", (req, res) => {
  // res.send("Registration POST Route");
  req.body.username
  req.body.password
  req.body.firstname
  req.body.lastname
  req.body.applicanttype
  User.register(new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    type: req.body.applicanttype
  }), req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render("register");
    }
    // change this if you want to use google, facebook or twitter authentication
    passport.authenticate("local")(req, res, () => {
      res.redirect("/secret");
    });
  });
});

// login routes
app.get("/login", (req, res) => {
  res.render("login");
});

// login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirerct: "/login"
}), (req, res) => {
  // passport.aunthenticate act as a middleware
});

// logout routes
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})

// middleware - isLoggedIn
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

// =============
// LOCAL HOST CONFIGURATION
// =============
app.listen(3000, () => {
  console.log("DXC Recruitment App Started! @ localhost:3000/");
});







/*
  Packages:
  body-parser - for gathering all the inputs within the form

  ejs - templating engine

  express - for routing

  express-session -   sessions - stateless http request, it doesn't have any state, this makes state ; another package that will make http request have a state

  mongoose - connection to the mongodb

  nodemon - change listener, auto restart when change occurs

  passport - used in authentication

  passport-local - strategies for local username and password

  passport-local-mongoose - help authentication method for more simpler usage of method

  password concept hashing - the hashing and salting is caused by the package manager passport local mongoose
  salt - helps us to decode the hash
  hash - contains the users password that is encoded in our db

  login - same as registration form but the only difference is where the form submits to
*/
