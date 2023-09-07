const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

let blogs = [];

function authentication(req,res,next){
    console.log("Doing the Authentication!!");
    next(); // After succefull it will call next middleware
}

function authorization(req,res,next){
    console.log("Doing the Authorization!!");
    next();
}

// middleware to read Request Data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/blogs",authentication,authorization, (req, res) => {
  return res.status(200).json({
    data: blogs,
    isSuccess: true,
  });
});

app.post("/blogs",authentication,authorization, (req, res) => {
  console.log(req.body);
  blogs.push(req.body);

  return res.status(200).json({
    isSucess: true,
  });
});

app.put("/blogs/:title", authentication,authorization,(req, res) => {
    blogs = blogs.map((item) => {
        if (item.title == req.params.title)
        {
            return {
                title: req.params.title,
                player:req.body.player
            }
        }
        return item;
    });
    return res.status(200).json({
      isSucess: true, 
    });
  });

app.delete("/blogs", authentication,authorization,(req, res) => {
  blogs = blogs.filter((item) => item.title != req.body.title);
  return res.status(200).json({
    isSucess: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
