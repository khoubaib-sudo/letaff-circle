import User from '../models/user'
import { hashPassword , comparePassword } from '../utils/auth';
    

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