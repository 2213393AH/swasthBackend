import Express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
// const secretKey = process.env.JWTSECRETKEY;
const secretKey = "abcdef";

const router=Express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

router.get('/',(req,res)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        console.log("New User logged user route "+decoded.user);
        res.json({ message: 'Welcome to the user Interface', user: decoded.user.Name });
    });
})

export default router;