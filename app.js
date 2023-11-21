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
  res.send("server working");
});

app.use("/registerLogin",registerLogin);
app.use("/user",user);


//listening for requests
app.listen(process.env.PORT||port, () => {
    console.log(`App listening of port ${port}`);
});
