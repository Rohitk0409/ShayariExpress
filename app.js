const { name } = require('ejs');
const express = require('express');
const app = express();
const port = 2000;
const mongoose = require('mongoose');
engine = require('ejs-mate');

// set cotegory 
app.set("view engine", "ejs");
app.engine('ejs', engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database working
mongoose.connect('mongodb://127.0.0.1:27017/Shayari')
  .then(() => console.log('Connected!'));

const ShayriSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  }
);
const Quotes = mongoose.model("Quotes", ShayriSchema);
const Alone = mongoose.model("Alone", ShayriSchema);
const Broken = mongoose.model("Broken", ShayriSchema);
const Emotional = mongoose.model("Emotional", ShayriSchema);
const Sad = mongoose.model("Sad", ShayriSchema);
const Life = mongoose.model("Life", ShayriSchema);
const Wishes = mongoose.model("Wishes", ShayriSchema);
const Love = mongoose.model("Love", ShayriSchema);
const Motivation = mongoose.model("Motivation", ShayriSchema);
const Romantic = mongoose.model("Romantic", ShayriSchema);
const Festival = mongoose.model("Festival", ShayriSchema);
const Special = mongoose.model("Special", ShayriSchema);
const FeedBackSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    feed: String,
  }
);
const feedback = mongoose.model("feedback", FeedBackSchema);
const JoinSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  city: String,
});
const Join = new mongoose.model("Join", JoinSchema);

// Route category
app.get("/", async (req, res) => {
  const data = await Quotes.find({});
  res.render("home.ejs", { data });
  console.log("route is woking");
});
app.get("/special", async (req, res) => {
  const data = await Special.find({});
  res.render("special.ejs",{data});
})
app.get("/motivation", async (req, res) => {
  const data = await Motivation.find({});
  res.render("motivation.ejs", { data });
});
app.get("/romantic", async (req, res) => {
  const data = await Romantic.find({});
  res.render("romantic.ejs",{data});
})
app.get("/alone", async (req, res) => {
  const data = await Alone.find({});
  res.render("alone.ejs", { data });
});
app.get("/sad", async (req, res) => {
  const data = await Sad.find({});
  res.render("sad.ejs",{data});
})
app.get("/love", async (req, res) => {
  const data = await Love.find({});
  res.render("love.ejs",{data});
});
app.get("/broken", async (req, res) => {
  const data = await Broken.find({});
  console.log(data);
  res.render("broken.ejs",{data});
});
app.get("/life", async (req, res) => {
  const data = await Life.find({});
  res.render("life.ejs",{data});
});
app.get("/festival", async (req, res) => {
  const data = await Festival.find({});
  res.render("festival.ejs", { data });
})
app.get("/wishes", async (req, res) => {
  const data = await Wishes.find({});
  res.render("wishes.ejs",{data});
});
app.get("/emotional", async (req, res) => {
  const data = await Emotional.find({});
  res.render("emotional.ejs", { data });
});
app.get("/feedback", async (req, res) => {
  res.render("feedback.ejs");
});
app.post("/feedback", async (req, res) => {
  const { name, email, feed } = req.body;
  try {
    const data = new feedback({
    name: name,
    email: email,
    feed: feed,
    });
    res.alert("hee");
  data.save();
    console.log(data);
    await alert("hii");
    res.redirect("/");
  }
  catch (e) {
    res.redirect("/");
  }
});
app.get("/join", async (req, res) => {
  res.render("join.ejs");
});
app.post("/join", async (req, res) => {
  const { name, email, age, city } = req.body;
 
    const user = new Join({
      name: name,
      email: email,
      age: age,
      city: city,
    });
  const data = await Join.findOne({ email: { $eq: email } });
  if (data) {
    console.log(data);
    res.render("join3.ejs");
  } else {
    user.save();
    res.render("join2.ejs");
    console.log("data is not found ");
 }
});

app.listen(port, () => {
  console.log(`Listening the port ${port}`);
});
