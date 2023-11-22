import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
// const secretKey = process.env.JWTSECRETKEY;
const secretKey = "abcdef";
const router=express.Router();


dotenv.config();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASELINK,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to the swasth database');
});


const usersSchema = new mongoose.Schema({
    _id: Number,
    Role : String,
    Name: String,
    FirstName: String,
    LastName: String,
    Password:String,
});
const user = mongoose.model("registerLogin", usersSchema);

router.post("/register", (req, res) => {
    const mobileNumber = req.body.mobileNumber;
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const role = req.body.Role;
    const Password =req.body.Password;
    console.log(req.body);
    const newUser = new user({
        _id: mobileNumber,
        role: role,
        FirstName: firstName,
        LastName: lastName,
        Password: Password,
    });

    newUser.save()
        .then(() => {
            console.log("New user Added with _id " + mobileNumber);
            res.status(200).json({message : "User registered successfully" });
        })
        .catch((error) => {
            if (error.code === 11000) {
                console.log("User Already Exists");
                res.status(400).json({message : "User Already Exists" , err : error});
            } else {
                console.error(error);
                res.status(500).json({message : "Internal Server Error" , err : error});
            }
        });
});


router.get("/login",(req,res)=>{
    const mobileNumber = req.body.mobileNumber;
    const password = req.body.Password;
    console.log(req.body);
    user.findOne({_id : mobileNumber})
    .then(details=>{
        const user={"mobibleNumber":mobileNumber,"Name":details.FirstName+" "+details.LastName};
        if(details.Password===password){
            const tkn = jwt.sign({user}, secretKey);
            res.json({message : "Authorized User" , token :tkn});
        }else{
            res.json({message : "Invalid Password" });
        }
    })
    .catch(error=>{
        res.json({err : error});
    })
});

export default router;