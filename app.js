import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import registerLogin from './routes/registerLogin.js';
import user from './routes/user.js';
dotenv.config();

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

//listerning for various routes
app.get("/",(req,res)=>{
  res.render("swasthLoading.ejs");
});

app.use("/registerLogin",registerLogin);
app.use("/user",user);
app.get("/test",(req,res)=>{
  const date = new Date();
  console.log("recived Test Request",date);
  res.json({message: "Server Working"});
});


// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).render("error404page.ejs"); // Assuming you have a 404.ejs file for your custom 404 page
});

//listening for requests
app.listen(process.env.PORT||port, () => {
    console.log(`App listening of port ${port}`);
});
