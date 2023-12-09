const express = require("express");
const mongoose = require("mongoose");
const Stories = require("./models/article");
const Article = require("./models/article");

const app = express();

app.get("/hello", (req, res) => {
  res.send("welcome to node js");
});

app.use(express.json());

app.get("/world", (req, res) => {
  res.send("hello world");
});

// app.get("/message/sayHello", (req, res) => {
//   let numbers = "";
//   for (let i = 0; i < 100; i++) {
//     numbers += i + " - ";
//   }
//   // res.json({
//   //   name: req.body.name,
//   //   state: "JSON HANDLING"
//   // })
//   res.render("index.ejs", { numbers: numbers });
// });

mongoose
  .connect(
    "mongodb+srv://babukre:00aa1122@mymongodb.zeaaeqc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("connection succed");
  })
  .catch((error) => {
    console.log("error happening");
  });
app.post("/Article", async (req, res) => {
  const newArticle = new Article();
  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;
  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 1000023;
  await newArticle.save();
  res.json(newArticle);
});
app.set("view engine", "ejs");

app.get("/Article", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/Article/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);
    res.json(article);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/deleteArticle/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findByIdAndDelete(id);
    console.log("this artice has been deleted");
    console.log(article);
    res.json(article);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/showAllArticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.render("index.ejs", { allArticles: articles });
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("i`m listening in port 3000");
});
