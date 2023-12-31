//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect('mongodb+srv://mahanthasimha37:rammahi21@mahanthasimha.0g62iuc.mongodb.net/blogdb')
  .then(() => console.log('Connected!'));

const Schemahomedata = new mongoose.Schema({
  title: String,
  name: String
});

const homedata = mongoose.model("homedata", Schemahomedata);

// const ports=[];


app.get("/", function (req, res) {
  homedata.find({})
    .then(function (posts) {
      res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: posts
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.get("/about", (req, res) => {
  res.render("about",
    {
      aboutContent: aboutContent
    });
});
app.get('/port/:postid', (req, res) => {
  const requestedPostId = req.params.postid;

  homedata.find({})
    .then(function (posts) {
      let foundPost = null;

      posts.forEach(function (post) {
        const addedtopic = _.lowerCase(post._id);
        const requestedPostIdLowerCase = _.lowerCase(requestedPostId);

        if (requestedPostIdLowerCase === addedtopic) {
          foundPost = post;
        }
      });

      if (foundPost) {
        res.render("post", {
          title: foundPost.title,
          content: foundPost.name
        });
        console.log("success");
      } else {
        // Handle the case when the requested post is not found
        res.send("Post not found");
      }
    })
    .catch(function (err) {
      console.log(err);
    });









  // posts.forEach(function (post) {
  //   const addedtopic = _.lowerCase(post.title);
  //   const requestedPostId = req.params.postid;

  // homedata.findOne({ _id: requestedPostId })
  //     .then(function (err, post) {
  //       if (!err) {
  //         res.render("post", {
  //           title: post.title,
  //           name: post.name

  //         });
  //       }
  //     });

  //   // if (topic === addedtopic) {
    //   res.render("post", {
    //     title: post.title,
    //     content: post.content
    //   });
    //   console.log("sucess");

    // }
  
});
app.get("/contact", (req, res) => {
  res.render("contact",
    {
      contactContent: contactContent
    })
})

app.get("/compose", (req, res) => {
  res.render("compose");
})
app.post("/compose", (req, res) => {
  const hometitle = req.body.data;
  const homebodydata = req.body.text;

  const data1 = new homedata({
    title: hometitle,
    name: homebodydata

  })
  data1.save();
  // const post = {
  //   title: req.body.data,
  //   content: req.body.text
  // }

  // ports.push(post);

  res.redirect("/");

})







app.listen(3000, function () {
  console.log("Server started on port 3000");
});
