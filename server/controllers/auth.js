import User from '../models/user'
import { hashPassword , comparePassword } from '../utils/auth';
import jwt from 'jasonwebtoken'

export const register = async (req, res) => {
   try{
        // console.log(req.body)
        const {name, email, password, cpassword} = req.body;
        //validation
        if(!name) return res.status(400).send("name is required")
        if(!password || password.length < 6 ) {
            return res
            .status(400)
            .send("password is required and should be min 6 charaters long")
        }
        if (!cpassword) return res.status(400).send("Confirm password is required");
        if(password !== cpassword) return res.status(400).send("Password Not Match...!")
        let userExist = await User.findOne({ email }).exec();
        if(userExist) return res.status(400).send("Email is taken");
        
        //hash password
        const hashedPassword = await hashPassword(password)
        
        //register
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        
        //console.log("save user", user);
        return res.json({ok: true});
    } catch (err) {
        console.log(err);
        return res.status(400).send('Error. Try again!')
   }
};

export const login = async (req,res) => {
    try{
        // console.log(req.body);
        const {email, password} = req.body
        // chech if our db has user with that email
        const user= awaitUser.findOne({ email }).exec();
        if (!user) return res.status(400).send("No user found");
        //check password
        const match = await comparePassword(password, user.password);
        //create signed jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        //return user and token to clinet, excluce hashed password
        user.password = undefined;
        //send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, //only work on https
        });
        // send user as json response 
        res.json(user)
    } catch (err){
        console.log(err);
        return res.status(400).send("Error! try again.");
    }
};